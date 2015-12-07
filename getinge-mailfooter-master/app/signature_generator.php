<?php
/*
Template Name: Signature Generator Page
*/


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require('signaturegenerator/UploadHandler.php');
    $upload_handler = new UploadHandler();
    die();
}
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
<body class="ggmfg">
<article class="m-article">
    <?php if (have_posts()) : ?> <?php while (have_posts()) : the_post(); ?>
        <script>
            gtng = {};
            gtng.title = '<?=get_the_title()?>';
            gtng.body = "<?=str_replace(array("\r", "\n"), '', addslashes( apply_filters('the_content',get_the_content())))?>";
            gtng.urlPrefix = '<?=get_template_directory_uri();?>/signaturegenerator/';
        </script>
        <div id="main_jsx_mailfooter"></div>
        <script src="http://code.jquery.com/jquery-2.0.0.min.js"></script>
        <script src="<?=get_template_directory_uri();?>/signaturegenerator/libs/jquery-ui.min.js"></script>

        <script src="<?=get_template_directory_uri();?>/signaturegenerator/libs/jquery.iframe-transport.js"></script>
        <script src="<?=get_template_directory_uri();?>/signaturegenerator/libs/jquery.fileupload.js"></script>
        <script src="<?=get_template_directory_uri();?>/signaturegenerator/main.js"></script>

    <?php endwhile; ?>
    <?php else : ?>
    <?php endif; ?>

</article>

</body>
</html>