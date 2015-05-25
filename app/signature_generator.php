<?php
/*
Template Name: Signature Generator Page
*/
    wp_enqueue_script( 'signaturegenerator-jsx', get_template_directory_uri() . '/signaturegenerator/main.js');
    wp_enqueue_style('signaturegenerator-css', get_template_directory_uri() . '/signaturegenerator/main.css');
    get_header();
?>

<article class="m-article">
<?php if (have_posts()) : ?> <?php while (have_posts()) : the_post(); ?>

    <section class="m-article-header">
    <div class="l-container m-page-header">
        <div class="l-span12">
            <h1 class="t-xlarge"></h1>
        </div>
    </section>
    <section class="l-container">
        <div class="l-span12">
            <span class="t-preamble">content</span>
        </div>
    </section>
    <section class="l-container">
        <div class="l-span12" id="main_jsx_mailfooter">

        </div>
    </section>


    <?php endwhile; ?>
    <?php else : ?>
    <?php endif; ?>

</article>


<?php get_footer(); ?>