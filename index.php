<?php

/*
  Plugin Name: Would You Rather? | Choices Plugin
  Description: Pick and choose one of the two options you would rather do in an interesting situation.
  Version: 1.0
  Author: Pratik
  Author URI: pratikpaudel458.com.np
*/

require("inc/wyr-route.php");
require("inc/giver.php");
require("inc/receiver.php");


if (!defined('ABSPATH')) exit; // Exit if accessed directly

class WouldYouRather
{
    function __construct()
    {
        add_action('init', array($this, 'adminAssets'));
    }
    function getAnswers()
    {
        $entityBody = file_get_contents('php://input');
        return json_decode($entityBody);
    }
    function adminAssets()
    {
        wp_register_style('wyrcss', plugin_dir_url(__FILE__) . 'build/index.css');
        wp_register_script('wyrjs', plugin_dir_url(__FILE__) . 'build/index.js');

        register_block_type('wyr/would-you-rather', array(
            'editor_script' => 'wyrjs',
            'editor_style' => 'wyrcss',
            'render_callback' => array($this, 'theBlock')
        ));
    }
    function theBlock($attributes)
    {
        //If you're not in the admin screen
        if (!is_admin()) {
            wp_enqueue_script('wyrFrontend', plugin_dir_url(__FILE__) . 'build/frontend.js', array('wp-element'));
            wp_enqueue_style('wyrFrontendStyles', plugin_dir_url(__FILE__) . 'build/frontend.css');
        }
        ob_start(); ?>
        <div class="would-you-rather-update-me <?php echo (is_user_logged_in(true)) ? "logged-in" : "" ?>">
            <pre style="display: none;"><?php echo wp_json_encode($attributes) ?></pre>
        </div>
<?php return ob_get_clean();
    }
}

$wouldYouRather = new WouldYouRather();
