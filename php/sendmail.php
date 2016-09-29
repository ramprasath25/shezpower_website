<?php

$message_array = array();

$subject = "Question via Contact Form";

if(empty($_POST['name'])) $message_array[] = 'Name';
if(empty($_POST['email'])) $message_array[] = 'Email';
if(empty($_POST['subject'])) $message_array[] = 'Subject';
if(empty($_POST['message'])) $message_array[] = 'Message';
$body = 'Name: '.$_POST['name'].'<br>';
$body .= 'Email: '.$_POST['email'].'<br>';
$body .= 'Subject: '.$_POST['subject'].'<br>';
$body .= 'Message: '.$_POST['message'].'<br>';


if(sizeof($message_array)==1){
	$message = $message_array[0].' is required field.';
}
elseif(sizeof($message_array)>1){
	$message = join(' and ', array_filter(array_merge(array(join(', ', array_slice($message_array, 0, -1))), array_slice($message_array, -1)))). ' are required fields.';
	// $message = implode(', ', $message_array). ' are required fields.';
}
else{
	$message = '';
}


if($message=='' && (isset($_POST['action']) && $_POST['action']=='js')){
	require_once('class.phpmailer.php');
	include("class.smtp.php");

	$mail = new PHPMailer();

	$mail->IsSMTP(); 							// telling the class to use SMTP
	$mail->SMTPDebug  = 2;                     	// enables SMTP debug information (for testing)
	$mail->SMTPAuth   = true;                  	// enable SMTP authentication
	$mail->SMTPSecure = "tls";                 	// sets the prefix to the server
	$mail->Host       = "smtp.gmail.com";      	// sets GMAIL as the SMTP server
	$mail->Port       = 587;                   	// set the SMTP port for the GMAIL server
	$mail->SMTPSecure = "ssl";
	$mail->Username   = "user@gmail.com"; 	// GMAIL username
	$mail->Password   = "xxxxx";          	// GMAIL password
	$mail->SetFrom('support@shezpower.com', 'Mailer');

	$mail->Subject = $subject;
	$mail->MsgHTML($body);
	$mail->AddAddress("support@shezpower.com", "support");

	if(!$mail->Send()) {
	   echo "Mailer Error: " . $mail->ErrorInfo;
	  echo "Error while sending message...";
	} else {
	  echo "OK";
	}
}
else{
	echo $message;
}
