<?php
     header('Content-Type:text/html;charset=utf-8');
      $data = file_get_contents('../json/photographersData.json');
      echo $data;
?>
