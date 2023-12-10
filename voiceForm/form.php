<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style/info.css">
    <title>Voice Activated Form</title>
</head>
<body>
    <section>
    <div class="info-sub">
        <!--to display the info from the form `-->
        <h3>You form has been submited</h3>
        <p>Thank you for your submission. this is the inforemation you submited.</p>
        <hr>
        <?php
        //read the valyes from the form in --index.html //
         $name = $_POST["name"];
         $city = $_POST["city"];
         $email = $_POST["email"];
         $age   = $_POST["age"];  

         //check if the valyes exists -printed or else print empty //
        if(!empty($name)){
            echo "<li> NAME: $name</li>";
        }
        else{
            echo ' ';
        }
        if(!empty($city)){
            echo "<li> CITY: $city</li>";
        }
        else{
            echo " ";
        }
        if(!empty($email)){
            echo "<li> EMAIL: $email</li>";
        }
        else{
            echo " ";
        }
        if(!empty($age)){
            echo "<li> AGE: $age</li>";
        }
        else{
            echo " ";
        }
        ?>
        <button><a href="index.html">back to the form</a></button>
    </section>
    </div>

</body>
</html>