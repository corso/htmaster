<?php
if ($_GET['randomId'] != "8mWtbN11GAVqsCQ6dW47MhvPzhrXe2dba0rIlA0wpqzXCf0_H6UUEn3btHUq05x_") {
    echo "Access Denied";
    exit();
}

// display the HTML code:
echo stripslashes($_POST['wproPreviewHTML']);

?>  
