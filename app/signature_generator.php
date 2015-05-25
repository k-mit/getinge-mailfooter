<?php
/*
Template Name: Signature Generator Page
*/

?>
<!DOCTYPE html>
<html>
<head>
    <title>Getinge Group Signature Generator</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <link rel="stylesheet" href="<?=get_template_directory_uri();?>/build/main.css"/>
    <script>
        if (typeof console === "undefined" || typeof console.log === "undefined") {
            console = {};
            console.log = function() {};
            console.warn = function() {};
            console.error = function() {};
        }

    </script>
</head>
<body>
<article class="m-article">
    <?php if (have_posts()) : ?> <?php while (have_posts()) : the_post(); ?>
        <script>
            gtng = {};
            gtng.title = '<?=get_the_title()?>';
            gtng.body = '<?=json_encode(get_the_title())?>';
            gtng.urlPrefix = '<?=get_template_directory_uri();?>/build/';
        </script>
        <div id="main_jsx_mailfooter"></div>
		<script>document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')</script>
		<script src="http://cdnjs.cloudflare.com/ajax/libs/zeroclipboard/2.2.0/ZeroClipboard.js"></script>
		<!--script src="<?=get_template_directory_uri();?>/signaturegenerator/psQuery.js"></script-->
		<script src="http://code.jquery.com/jquery-2.0.0.min.js"></script>
		<script src="<?=get_template_directory_uri();?>/build/main.js"></script>

    <?php endwhile; ?>
    <?php else : ?>
    <?php endif; ?>

</article>

</body>
</html>
