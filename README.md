#  Anywhere Fitness Back-End Project
Link: https://anywherefitnessapp.herokuapp.com/

### Client
| Request	  | Endpoint |  Description |
| ------------- | ------------- | ------------- |
| GET  |/api/clients	  |  return all clients | 
| GET | /api/clients/class	  |  return all class info + instructor name   |
| GET |/api/clients/:id	  |  return detailed client info by client id  |
| POST | /api/signup/client	 |  Sign Up as a new client  |
| POST | /api/clients/:id/enrollclass/:cid	  |  enroll a class as a client / :id -> clientid  :cid -> classid  |
| DELETE | /api/clients/:id/deleteclass/:cid	  |  delete enrolled  class as a client \| :id -> clientid  :cid -> classid   |
	
### Instructor & Client		
| Request	  | Endpoint |  Description |
| ------------- | ------------- | ------------- |
| POST | /api/signin		 |  Sign In for Client and Instructor. Api returns role_id  |

		
### Instructor	
| Request	  | Endpoint |  Description|
| ------------- | ------------- |  ------------- |
|GET |	/api/instructor                   |	      It returns all Instructors                                    |
|GET |	/api/instructor/:id	              |       It returns detailed instructor info by instructor id           |
|POST	| /api/signup/instructor	          |       Sign Up New Instructor                                       |
|POST	| /api/signin/instructor	          |       Sign In  Instructor                                            |
|POST	| /api/instructor/createclass	      |       Create new class as a instructor                             |
|UPDATE	| /api/instructor/updateclass/:cid |      Update class as a instructor :cid -> class id               |
|DELETE	| /api/instructor/deleteclass/:cid  |	    Delete created class as a instructor \| :cid -> classid      |

### Required Fields For Requests

| Client Signup	  | Client - Instructor Sign in |  Instructor Signup|Instructor Create Class|
| ------------- | ------------- |  ------------- |------------- |
|name	           |     email    |	name	          |	class_name|	
|email (unique)|		password 	|	email (unique)	|	type|	
|password |		|		password |		start_time|	
|		|	|role_id (AuthCode 123 ) |		start_date|	
|		|	|		|duration|	
|		|	|		|intensity_level|	
|	|	|		|	location|	
|		|	|		|registered_attendees|	
|		|	|		|class_size  (not required)|	
|		|	|		|                                instructor_id  |	

		
    
    
    
    			
	 		
	 		
 		 
	

