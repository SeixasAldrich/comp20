<!doctype html>
<html>
<head>
    <title>Jade Delight Order Page</title>
	<meta charset="utf-8"/>
    <link rel='stylesheet' type="text/css" href="styleJadeDelight.css" />
</head>

<body>
    <h3>
    <?php 
        $order = $_GET["order"];
        $email = $_GET["email"];
        $total = $_GET["total"];
        $p_or_d = $_GET["p_or_d"];
        $time = $_GET["time"];
        
        echo $order;
        
        $message = "Thank you for your order! The total cost of your food is $" 
        . $total . ", and it will be ready for " . $p_or_d . " at " . $time . ".";
        
        mail($email, "Jade Delight Order Confirmation", $message);
    ?>
    </h3>
</body>
</html>
