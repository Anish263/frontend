import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tweetResponse } from '../tweet/tweetResponse';
import { TweetService } from '../tweet/tweetservice';

@Component({
  selector: 'app-single-user-tweets',
  templateUrl: './single-user-tweets.component.html',
  styleUrls: ['./single-user-tweets.component.css']
})
export class SingleUserTweetsComponent implements OnInit {

  tweets: any;
  replyDesc: String;
  userName:string = ''
  reply: Array<boolean> = [false];
  likeStatus: Array<boolean> = [false];
  ress: any;
  id: any;
  constructor(private activatedRoute: ActivatedRoute, private tweetService: TweetService) {
    this.replyDesc= '';
   }

  ngOnInit(): void {
    this.userName = JSON.parse(localStorage.getItem('loggedInUser')).email;
    this.activatedRoute.params.subscribe(params => {
      this.id = params['userid'];

      console.log(this.id);
      this.tweetService.getUserTweet(this.id).subscribe((response)=>{
        this.tweets = response;
        console.log(this.tweets);
      })
      });
  }

  dateConv(tweets){
    tweets.forEach((tweet)=>{
      var tdate = new Date(tweet.tweetDate).getTime();
      var date = new Date().getTime();
      var time = date-tdate;
      var mins = Math.floor(time / 60000);
      var hrs = Math.floor(mins / 60);
      var days = Math.floor(hrs / 24);
      var yrs = Math.floor(days / 365);
      if (mins < 60) {
        tweet.tweetDate = mins + ' mins ago';
      }
      else if (mins > 60 && hrs <= 24) {
        tweet.tweetDate = hrs + ' hours ago';
      }
      else if(days < 365 || days < 366){
        tweet.tweetDate = days + ' days ago';
      }else{
        tweet.tweetDate = yrs + ' years ago';
      }
    });
}

  setTweets(response: any){
    this.ress = response as tweetResponse[];
    this.ress.sort((a, b) => new Date(b.tweetDate).getTime() - new Date(a.tweetDate).getTime());
    this.tweets=this.ress;
    console.log(this.tweets);
    this.dateConv(this.tweets);
  }

  postcomment(index: any, i: any) {
    console.log(index,i);
    console.log(this.replyDesc);
    const request = ({
      userName: JSON.parse(localStorage.getItem('loggedInUser')).email,
      tweetId: index,
      comment: this.replyDesc
    });
    this.reply[i] = false;
    this.tweetService.replyTweet(request).subscribe((response: any) => {
      this.ngOnInit();
    })
  }

  likeTweet(id){
    this.tweetService.likeTweet(id).subscribe(_ => {
      this.tweetService.getUserTweet(this.id).subscribe((response:any)=>{
        this.setTweets(response);
      });
    });
     }


  unlike(id: any) {
    this.tweetService.unLikeTweet(id).subscribe(_ => {
      this.tweetService.getUserTweet(this.id).subscribe((response:any)=>{
        this.setTweets(response);
      });
    });
     }

}
