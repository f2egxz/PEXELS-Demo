<?php
     header('Content-Type:text/html;charset=utf-8');

     	$page = $_GET['page'];

     	$pageSize = $_GET['pageSize'];

     	$reqJson =  $_GET['reqJson'];

     	$jsonAddress = '../json/'.$reqJson;

        $data = file_get_contents($jsonAddress);

     	$data = json_decode($data);

     	$offset = ($page - 1) * $pageSize;

     	$result = array_slice($data, $offset, $pageSize);

     	$page++;

     	echo json_encode(array('page'=>$page, 'items'=>$result));

     	sleep(1);
?>
