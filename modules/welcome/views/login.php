<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>H.R.I.S</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="">
		<meta name="author" content="">
	
		<link href="<?php echo base_url('load/ui/css/style.css'); ?>" rel='stylesheet' type='text/css'>
		<script type="text/javascript" src="<?php echo base_url('load/ui/js/jquery.min.js'); ?>"></script>
	</head>

	<body>
	<script type="text/javascript">
		$(document).ready(function() {
			$(".username").focus(function() {
				$(".user-icon").css("left","-48px");
			});
			$(".username").blur(function() {
				$(".user-icon").css("left","0px");
			});
			
			$(".password").focus(function() {
				$(".pass-icon").css("left","-48px");
			});
			$(".password").blur(function() {
				$(".pass-icon").css("left","0px");
			});
		});
	</script>

</head>
<body>

<!--WRAPPER-->
<div id="wrapper">

	<!--SLIDE-IN ICONS-->
    <div class="user-icon"></div>
    <div class="pass-icon"></div>
    <!--END SLIDE-IN ICONS-->

<!--LOGIN FORM-->
<?php echo form_open('welcome/validasi', array('name'=>'login-form', 'class'=>'login-form')); ?>

	<!--HEADER-->
    <div class="header">
    <!--TITLE--><h1>H.R.I.S Login Area</h1><!--END TITLE-->
    
    </div>
    <!--END HEADER-->
	
	<!--CONTENT-->
    <div class="content">
	<!--USERNAME--><input name="username" type="text" class="input username" placeholder="Username" onfocus="this.value=''" /><!--END USERNAME-->
    <!--PASSWORD--><input name="password" type="password" class="input password" placeholder="Password" onfocus="this.value=''" /><!--END PASSWORD-->
    </div>
    <!--END CONTENT-->
    
    <!--FOOTER-->
    <div class="footer">
    <!--LOGIN BUTTON--><input type="submit" name="submit" value="Login" class="button" /><!--END LOGIN BUTTON-->
    </div>
    <!--END FOOTER-->

</form>
<!--END LOGIN FORM-->

</div>
<!--END WRAPPER-->

<!--GRADIENT--><div class="gradient"></div><!--END GRADIENT-->
	</body>
</html>