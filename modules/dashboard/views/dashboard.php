<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>H.R.I.S</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="">
		<meta name="author" content="">
		<link rel="stylesheet" type="text/css" href="<?php echo base_url('load/lib/extjs5/resources/css/ext-all.css'); ?>">
		<link rel="stylesheet" type="text/css" href="<?php echo base_url('load/lib/extjs5/resources/ext-theme-classic/ext-theme-classic-all.css'); ?>">
		<link rel="stylesheet" type="text/css" href="<?php echo base_url('load/lib/css/style.css'); ?>">
		<script type="text/javascript" src="<?php echo base_url('load/lib/extjs5/ext-all-debug.js'); ?>"></script>
		<script type="text/javascript" src="<?php echo base_url('load/lib/extjs5/ext-theme-classic.js'); ?>"></script>
		<script type="text/javascript">
			<?php session_start(); ?>
			var BASE_URL 	= "<?php echo base_url(); ?>";
			var ROOTDIR 	= "apps/";
			var USERNAME 	= "<?php echo $this->session->userdata('name'); ?>";
			var ID 			= "<?php echo $this->session->userdata('id'); ?>";
			<?php echo $previlege; ?>
		</script>
	</head>

	<body>
	<script src="<?php echo base_url('apps/app.js'); ?>" type="text/javascript"></script>

	</body>
</html>