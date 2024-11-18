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
    "username": "Lincoln",
    "password": "adminpassword"
  }'

curl -X GET http://localhost:5000/api/auth/users/1 \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJMaW5jb2xuIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMxODY1NjIyLCJleHAiOjE3MzE4NjkyMjJ9.sBe7dIiPrfHO0-sCtFX8OV9L8_0b_TluBlTJH3jQIAg"


Post-Author
curl -X POST http://localhost:5000/api/articles/authors \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJMaW5jb2xuIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMxOTU0NTUwLCJleHAiOjE3MzE5NTgxNTB9.8eEeyuGd9Ts2W-kGA4LJXxZTjZkkdQvx2OXs1MOKCes" \
  -F "name=Henry Llllllevitt" \
  -F "bio=Henry Levitt is a true enigma from the quiet suburbia of Connecticut, now the eccentric president of the UGA Philosophy Club. His leadership has transformed the club into a philosophical circus, complete with debates that spiral into absurdity, like whether cereal counts as soup. Henry’s articles are infamous rollercoasters, bouncing from critiques of capitalism to love letters about rotary telephones, blending obscure references with bizarre humor. His most memorable piece, The Moral Dilemma of Owning Too Many Salt Shakers, leaves readers confused and amazed. When he’s not philosophizing, Henry is the bassist for Xur, a metal band that delivers chaos through tracks like Apocalyptic Dumpster Fire. His basslines stomp like elephants in a nightmare, and he often surprises bandmates by showing up dressed as a giant eyeball or freezing on stage like a musical gargoyle. Henry is the kind of guy who passionately argues that birds have secret societies and that Nietzsche would’ve been an excellent meme creator. Known for his lectures on the ethics of wacky waving tube men, Henry’s unique blend of weirdness and brilliance makes him unforgettable." \
  -F "profileImage=@C:\Users\linco\Desktop\Past Issues\Silly_cat2.jpg"


curl -X POST http://localhost:5000/api/articles \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJMaW5jb2xuIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMxMDQ1NDQ4LCJleHAiOjE3MzEwNDkwNDh9.d4i824Syx4tZ8rqjrjE894h7Z5mvU1QUHsHUO5eGMuQ" \
  -F "title=The Sensationalist: #7" \
  -F "description= Patchwork Quilt " \
  -F "filetype=Issue" \
  -F "viewcount=0" \
  -F "downloadcount=0" \
  -F "authorIds[]=1" \
  -F "authorIds[]=2" \
  -F "pdf=@C:\Users\linco\Desktop\Past Issues\The_Sensationalist_7.pdf" \
  -F "coverImage=@C:\Users\linco\Desktop\Past Issues\The-Sensationalist-Cover-7.png"

curl -X POST http://localhost:5000/api/articles \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJMaW5jb2xuIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMxMDQ1NDQ4LCJleHAiOjE3MzEwNDkwNDh9.d4i824Syx4tZ8rqjrjE894h7Z5mvU1QUHsHUO5eGMuQ" \
  -F "title=The Sensationalist: Vol 2" \
  -F "description=Sensationalist volume 2" \
  -F "filetype=Volume" \
  -F "viewcount=0" \
  -F "downloadcount=0" \
  -F "authorIds[]=1" \
  -F "authorIds[]=2" \
  -F "pdf=@C:\Users\linco\Desktop\Past Issues\The_Sensationalist_vol2.pdf" \
  -F "coverImage=@C:\Users\linco\Desktop\Past Issues\The-Sensationalist-Cover-Vol2.png"

  curl -X GET http://localhost:5000/api/cart/ \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJMaW5jb2xuIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMxMjkzNTc3LCJleHAiOjE3MzEyOTcxNzd9.GC1Mk7kYzKbF9xVtaIWVZxJYJ2gssg7ZPNrV_CRRgvU" \
  -H "Content-Type: application/json"


