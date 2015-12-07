<?php


if (isset($_GET['action']) && $_GET['action'] == 'fileupload') {
	define ('MF_SITE_ROOT', realpath(dirname(__FILE__)));
	$target_dir = "/php/files/";
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
			echo 'http://src.wordpress-develop.dev/wp-content/themes/twentytwelve/'.$target_file;
		} else {
			echo "";
		}
	}
}