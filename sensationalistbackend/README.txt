curl -X POST http://localhost:5000/api/articles ^
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJMaW5jb2xuIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMwMzEyMjM4LCJleHAiOjE3MzAzMTU4Mzh9.bhm9EiyBTjTT1Yq7lF_w_ALhPVaE-nWM8GOzY_ROUtk" ^
  -F "title=The Sensationalist Issue 1" ^
  -F "filetype=Issue" ^
  -F "coverImage=@\"C:/Users/linco/Desktop/Past Issues/The-Sensationalist-Cover-1.png\"" ^
  -F "pdf=@\"C:/Users/linco/Desktop/Past Issues/The_Sensationalist_1.pdf\"" ^
  -F "description=This Issue Includes:\nSymmetry (A short film script)\nThe Fabric Cube\nOne Day I Will Replace All the Caffeine in Your Coffee.\nNew Stanford Study Raises Alarm Over Widespread Addiction\nThe O.A.R. Project,\nMusic of the #1: Clubbing Harder @ Home"
^ command prompt

Add Users
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "Lincoln",
    "email": "Lincolnledet@gmail.com",
    "password": "adminpassword",
    "role": "admin"
  }'


get user hash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "Linc",
    "password": "adminpassword"
  }'