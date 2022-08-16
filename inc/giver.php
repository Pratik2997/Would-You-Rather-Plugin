<?php 
        add_action( 'wp_enqueue_scripts', 'my_second_enqueue' );
        add_action( 'wp_ajax_anAction', 'my_second_action' );
        add_action( 'wp_ajax_nopriv_anAction', 'my_second_action' );
        

    function my_second_enqueue() {
        wp_register_script( 'ajax-script', plugins_url( '/src/WyrRoute.js' , __FILE__ ), array('jquery') );
        wp_enqueue_script('ajax-script');
        wp_localize_script( 'ajax-script', 'ajax_object', array( 'ajax_url' => admin_url( 'admin-ajax.php' ) ) );
    }
    function my_second_action(){
        global $wpdb;
        $question_id = $_GET['question_Id'];
        $tablename = $wpdb->prefix ."wyr_answers";
        $queryForAnswer1 = "SELECT COUNT(*) FROM $tablename WHERE questionid = $question_id AND answer1clicks = 1";
        $queryForAnswer2 = "SELECT COUNT(*) FROM $tablename WHERE questionid = $question_id AND answer2clicks = 1";
        $count1 = $wpdb->get_var($wpdb->prepare($queryForAnswer1));
        $count2 = $wpdb->get_var($wpdb->prepare($queryForAnswer2));
        if ($count1 < $count2) {
            $percentOf1 = $count1 / $count2 * 100;
            $percentOf2 = 100 - $percentOf1;
        }
        elseif($count1 > $count2){
            $percentOf2 = $count2 / $count1 * 100;
            $percentOf1 = 100 - $percentOf2;
        }
        else{
            $percentOf1 = 50;
            $percentOf2 = 50;
        }
        echo round($percentOf1);
        echo " ";
        echo round($percentOf2);
        wp_die();
    }