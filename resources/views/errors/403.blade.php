<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Authentication Successful</title>
    <style>
        /* --- General Styling and Layout --- */
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background-color: #ffffff;
            color: #1f2937;
            text-align: center;
        }

        /* Header (Twingate Logo/Brand Name) */
        .header {
            position: absolute;
            top: 30px;
            left: 50px;
            font-size: 1.25em;
            font-weight: 600;
            color: black;
        }

        /* --- Main Content and Status Icon --- */
        .status-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 40px;
            opacity: 0; 
            animation: fadeIn 0.5s ease-out 0.5s forwards; 
        }

        .success-icon {
            width: 80px;
            height: 80px;
            position: relative;
            margin-bottom: 25px;
        }

        /* Thin-Stroke Circle */
        .circle {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 3px solid #38c172; 
            box-sizing: border-box;
            opacity: 0;
            transform: scale(0.5);
            animation: scaleIn 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards; 
        }

        /* Thin-Stroke 90-Degree Rotated Checkmark (Points Left) */
        .check {
            position: absolute;
            /* Adjust position for the new rotation */
            top: 25px; 
            left: 20px;
            width: 40px;
            height: 20px;
            border: 0 solid transparent;
            border-right-width: 3px; 
            border-bottom-width: 3px; 
            border-color: #38c172;
            
            /* Key Change: Rotates 45deg, flips horizontally, and then rotates 90deg */
            transform: rotate(45deg) scaleX(-1) rotate(90deg);
            
            opacity: 0;
            animation: drawCheck 0.4s ease-out 0.2s forwards; 
        }
        
        /* --- Text and Messaging --- */
        h1 {
            font-size: 2em;
            font-weight: 600;
            color: #1f2937;
            margin: 0 0 10px 0;
        }

        p {
            font-size: 1.1em;
            color: #6b7280;
            margin: 0;
        }

        /* --- Footer --- */
        .footer {
            position: absolute;
            bottom: 30px;
            width: 100%;
            text-align: center;
            font-size: 0.9em;
            color: #9ca3af;
        }

        .footer a {
            color: #9ca3af;
            text-decoration: none;
            margin: 0 5px;
            transition: color 0.3s;
        }


        /* --- Keyframe Animations --- */
        @keyframes scaleIn {
            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        @keyframes drawCheck {
            0% {
                height: 0;
                width: 0;
                opacity: 0;
            }
            50% {
                height: 0;
                width: 40px;
                opacity: 1;
            }
            100% {
                height: 20px;
                width: 40px;
                opacity: 1;
            }
        }
        
        @keyframes fadeIn {
            to {
                opacity: 1;
            }
        }
    </style>
</head>
<body>

    <div class="header">
        PMS Authentication
    </div>

    <div class="status-container">
        <div class="success-icon">
            <div class="circle"></div>
            <div class="check"></div> </div>

        <h1>Authenticated</h1>
        <p>You can now close this page.</p>
    </div>

    <div class="footer">
        <a href="#">Terms</a> • <a href="#">Privacy</a> • &copy; 2025 PMS by Larable

</body>
</html>