<?php 
class WouldYouRatherTable{
  function __construct()
  {
    global $wpdb;
    $this->charset = $wpdb->get_charset_collate();
    $this->tablename = $wpdb->prefix . "wyr_answers";
    add_action('activate_would-you-rather/index.php', array($this, 'onActivate'));
  }
  function onActivate() {
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta("CREATE TABLE $this->tablename (
      id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
      questionid bigint(20) NOT NULL DEFAULT 0,
      answer1clicks bigint(20) NOT NULL DEFAULT 0,
      answer2clicks bigint(20) NOT NULL DEFAULT 0,
      userId bigint(20) NOT NULL DEFAULT 0,
      PRIMARY KEY  (id)
    ) $this->charset;");
  }

}
$wouldYouRatherDataTable = new WouldYouRatherTable();

