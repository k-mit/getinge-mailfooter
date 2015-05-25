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
    <link rel="stylesheet" href="<?=get_template_directory_uri();?>/signaturegenerator/main.css"/>
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
            gtng.urlprefix = '<?=get_template_directory_uri();?>/signaturegenerator/';
        </script>
        <div id="main_jsx_mailfooter"></div>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/zeroclipboard/2.2.0/ZeroClipboard.js"></script>
        <script src="<?=get_template_directory_uri();?>/signaturegenerator/main.js"></script>

    <?php endwhile; ?>
    <?php else : ?>
    <?php endif; ?>

</article>

</body>
</html>
