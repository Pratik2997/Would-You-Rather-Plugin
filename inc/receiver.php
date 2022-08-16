<?php 
        add_action( 'wp_enqueue_scripts', 'my_enqueue' );
        add_action( 'wp_ajax_my_action', 'my_action' );

    function my_enqueue() {
        wp_register_script( 'ajax-script', plugins_url( '/src/WyrRoute.js' , __FILE__ ), array('jquery') );
        wp_enqueue_script('ajax-script');
        wp_localize_script( 'ajax-script', 'my_ajax_object', array( 'ajax_url' => admin_url( 'admin-ajax.php' ), 'we_value'=>1234  ) );
    }
    function my_action(){
        global $wpdb;
        $question_id = $_POST['question_id'];
        $answer1clicks = $_POST['answer1clicks'];
        $answer2clicks = $_POST['answer2clicks'];
        $tablename = $wpdb->prefix . "wyr_answers";
        $currentUser = get_current_user_id();
        $existingUser = "SELECT COUNT(*) FROM $tablename WHERE questionid = $question_id AND userId = $currentUser";
        $countExistingUser = $wpdb->get_var($wpdb->prepare($existingUser));
        if($countExistingUser == 0){
            $wpdb->insert($wpdb->prefix . "wyr_answers", array(
                'questionid' => $question_id,
                'answer1clicks' => $answer1clicks,
                'answer2clicks' => $answer2clicks,
                'userId' => get_current_user_id()
            ) );
        }
        wp_die();
    }