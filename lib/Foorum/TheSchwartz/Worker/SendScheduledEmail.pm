package Foorum::TheSchwartz::Worker::SendScheduledEmail;

use strict;
use warnings;
use Foorum::Version; our $VERSION = $Foorum::VERSION;
use TheSchwartz::Job;
use base qw( TheSchwartz::Worker );
use Foorum::SUtils qw/schema/;
use Foorum::Logger qw/error_log/;
use Foorum::XUtils qw/config base_path/;

sub work {
    my $class = shift;
    my TheSchwartz::Job $job = shift;

    my @args = $job->arg;

    my $schema = schema();

    my $rs = $schema->resultset('ScheduledEmail')->search( { processed => 'N' } );

    my $handled = 0;
    while ( my $rec = $rs->next ) {

        send_email(
            $rec->from_email, $rec->to_email, $rec->subject,
            $rec->plain_body, $rec->html_body
        );

        # update processed
        $rec->update( { processed => 'Y' } );
        $handled++;
    }

    if ($handled) {
        error_log( $schema, 'info', "$0 - sent: $handled" );
    }

    $job->completed();
}

use MIME::Entity;
use Email::Send;
use YAML qw/LoadFile/;

my $base_path = base_path();
my $config;
if ( -e "$base_path/conf/mail.yml" ) {
    $config = LoadFile("$base_path/conf/mail.yml");
} else {
    $config = LoadFile("$base_path/conf/examples/mail/sendmail.yml");
}

if ( $config->{mailer} eq 'Sendmail' ) {
    if ( -e '/usr/sbin/sendmail' ) {
        $Email::Send::Sendmail::SENDMAIL = '/usr/sbin/sendmail';
    }
}

my $mailer = Email::Send->new($config);

sub send_email {
    my ( $from, $to, $subject, $plain_body, $html_body ) = @_;

    my $top = MIME::Entity->build(
        'X-Mailer' => undef,                     # remove X-Mailer tag in header
        'Type'     => "multipart/alternative",
        'Reply-To' => $from,
        'From'     => $from,
        'To'       => $to,
        'Subject'  => $subject,
    );

    return unless ( $plain_body or $html_body );

    if ($plain_body) {
        $top->attach(
            Encoding => '7bit',
            Type     => 'text/plain',
            Charset  => 'utf-8',
            Data     => $plain_body,
        );
    }

    if ($html_body) {
        $top->attach(
            Type     => 'text/html',
            Encoding => '7bit',
            Charset  => 'utf-8',
            Data     => $html_body,
        );
    }

    my $email = $top->stringify;
    $mailer->send($email);
}

1;
