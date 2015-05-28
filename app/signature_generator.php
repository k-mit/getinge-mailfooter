<?php
/*
Template Name: Signature Generator Page
*/


if (isset($_GET['action']) && $_GET['action'] == 'fileupload') {
    define ('MF_SITE_ROOT', realpath(dirname(__FILE__)));
    $target_dir = "/signaturegenerator/banners/";
    $fi = new FilesystemIterator(MF_SITE_ROOT.$target_dir, FilesystemIterator::SKIP_DOTS);
    $filecnt=iterator_count($fi)+1;
    $target_file = $target_dir .$filecnt. basename($_FILES["fileInput"]["name"]);
    $uploadOk = 1;
    $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);
    $check = getimagesize($_FILES["fileInput"]["tmp_name"]);
    if ($check !== false) {
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }

    // Check if file already exists
    if (file_exists($target_file)) {
        echo "Sorry, file already exists.";
        $uploadOk = 0;
    }
// Check file size
    if ($_FILES["fileInput"]["size"] > 500000) {
        echo "Sorry, your file is too large.";
        $uploadOk = 0;
    }
// Allow certain file formats
    if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg") {
        echo "Sorry, only JPG, JPEG, PNG files are allowed.";
        $uploadOk = 0;
    }
// Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        echo "error";
// if everything is ok, try to upload file
    } else {
        if (move_uploaded_file($_FILES["fileInput"]["tmp_name"], MF_SITE_ROOT.$target_file)) {
            echo get_template_directory_uri().$target_file;
        }
        die();
    }
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
            gtng.body = '<?=json_encode(get_the_title())?>';
            gtng.urlPrefix = '<?=get_template_directory_uri();?>/signaturegenerator/';
        </script>
        <div id="main_jsx_mailfooter"></div>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/zeroclipboard/2.2.0/ZeroClipboard.js"></script>
        <script src="http://code.jquery.com/jquery-2.0.0.min.js"></script>
        <script src="<?=get_template_directory_uri();?>/signaturegenerator/main.js"></script>

    <?php endwhile; ?>
    <?php else : ?>
    <?php endif; ?>

</article>

</body>
</html>