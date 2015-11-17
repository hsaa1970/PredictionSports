<?php
	  $get =  file_get_contents('http://tim.sports.hecticus.com/newsapi/v1/news/get/'.$_REQUEST['id'].'?timezoneName=GMT-0500&upstreamChannel=Web&api_password=1234)9|1');
		$data = (Object)json_decode($get);
?>

<!DOCTYPE html>
<html>
<head lang="en">
  <meta charset="UTF-8">
  <meta property="og:title" content="<?php echo $data->response->title; ?>"/>
  <meta property="og:image" content="<?php echo $data->response->resources->mid[0]; ?>"/>
  <meta property="og:site_name" content="Tim Palpites"/>
  <meta property="og:description" content="<?php echo $data->response->summary; ?>"/>
</head>
<body>

<img src="<?php echo $data->response->resources->mid[0]; ?>" alt="<?php echo $data->response->title; ?>">
<h2><?php echo $data->response->title; ?></h2>
<p><?php echo $data->response->summary; ?></p>

</body>
</html>