import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  token:string = '';
  header: any ;

  constructor(private httpClient:HttpClient, private userService:UserService) {
   }

  //done
  postNewTweet(postTweetForm){
    this.header= {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.userService.getToken()}`)
    }
    let body={
      tweetText: postTweetForm.value.tweetDes,
      recActive: "y"
    }
    return this.httpClient.post("http://tweetapp-env.eba-m9hie6r3.ap-northeast-1.elasticbeanstalk.com/api/v1/tweets/add", body, this.header);
  }

  //done
  getAllTweets(){
    this.header= {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.userService.getToken()}`)
    }
    return this.httpClient.get("http://tweetapp-env.eba-m9hie6r3.ap-northeast-1.elasticbeanstalk.com/api/v1/tweets/all",this.header);
  }


  replyTweet(request){
    this.header= {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.userService.getToken()}`)
    }
    return this.httpClient.post("http://tweetapp-env.eba-m9hie6r3.ap-northeast-1.elasticbeanstalk.com/api/v1/tweets/" + request.userName + "/reply/" + request.tweetId, request, this.header);
  }

  //done
  getUserTweet(username:string){
    this.header= {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.userService.getToken()}`)
    }
    let user = JSON.parse(localStorage.getItem('loggedInUser'));
    this.header.headers = this.header.headers.set('loggedInUser',user.email);
    console.log(this.header);
    return this.httpClient.get("http://tweetapp-env.eba-m9hie6r3.ap-northeast-1.elasticbeanstalk.com/api/v1/tweets/"+username, this.header);
  }

  //done
  deleteTweet(id){
    this.header= {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.userService.getToken()}`)
        .set('tweetId',id)
    }
    let user = JSON.parse(localStorage.getItem('loggedInUser')).email;
    return this.httpClient.delete("http://tweetapp-env.eba-m9hie6r3.ap-northeast-1.elasticbeanstalk.com/api/v1/tweets/" + user + "/delete/", this.header);
  }

  //done
  likeTweet(id){
    let body ={}
    this.header= {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.userService.getToken()}`)
    }
     return this.httpClient.post("http://tweetapp-env.eba-m9hie6r3.ap-northeast-1.elasticbeanstalk.com/api/v1/tweets/"+JSON.parse(localStorage.getItem('loggedInUser')).email+"/like/"+id, body, this.header);
  }

  //done
  unLikeTweet(id){
    let body ={}
    this.header= {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.userService.getToken()}`)
    }
     return this.httpClient.post("http://tweetapp-env.eba-m9hie6r3.ap-northeast-1.elasticbeanstalk.com/api/v1/tweets/"+JSON.parse(localStorage.getItem('loggedInUser')).email+"/dislike/"+id, body, this.header);
 }

 //done
 updateTweet(updateTweet){
  this.header= {
    headers: new HttpHeaders()
      .set('Authorization',  `Bearer ${this.userService.getToken()}`)
  }
  console.log(updateTweet);
  return this.httpClient.put("http://tweetapp-env.eba-m9hie6r3.ap-northeast-1.elasticbeanstalk.com/api/v1/tweets/update/",updateTweet.value,this.header);
 }
}
