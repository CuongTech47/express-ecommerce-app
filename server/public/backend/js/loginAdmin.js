$(document).ready(function() {
    $("#loginForm").on("submit" ,function(event) {
        event.preventDefault();
        let admin_email = $("#admin_email").val()
        let admin_password = $("#admin_password").val()

        $.ajax({
            url : "/admin-dashboard",
            method: "POST",
           
            data : {
                admin_email,
                admin_password
            }
        }).then(data=>{
            console.log(data)
        })
        .catch(err=> {
            console.log(err)
        })
    })
})