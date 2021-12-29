#ENDPOIN API 

*User Authenticate
Method		URL						Body
POST		/v1/api/signin			['email', 'password']
POST		/v1/api/signup			['fullname', 'usernama', 'email', 'password', 'confirm_password']
POST		/v1/api/signout			[]

*User 
*token, protec*
Method		URL						Body
GET			/v1/api/user/profile	[]
PUT			/v1/api/user/profile	[fullname, password]

*Master
*token, protec, isadmin, permission*
Method		URL						Body
GET			/v1/api/roles			[]
POST		/v1/api/roles			[roles_name, descripsi]
PUT			/v1/api/roles/:id/edit	[descripsi]
DELETE		/v1/api/roles/:id		[]

POST		/v1/api/module			[title, link, icon, parent_id, order]
PUT			/v1/api/module/:id/edit	[title, link, icon, parent_id, order]
DELETE		/v1/api/module/:id		[]





konasep refresh token tanpa menyimpan token di localstorage ?

user login menggunakan email dan password,
user berhasil login akan mendapatkan acces token acces token di simpan ke state, 
bagaimana jika dilakukan Refresh pada browser, ?
- bisa melakukan pengecekan dengan enpoint /api/refreshtoken jika refresh token ada pada cookies dan cek apakah refresh token valid, jika bener akan di buat kan kembali access token dan di simpan ke state lagi

bagaimana jika user belum melakukan login ?
jika belum login tidak mengecek endpoin api/refreshtoken, akan tetapi jika user sudah login dan mengakes url login akan menredirek ke halaman utaman


