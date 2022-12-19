import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tweetResponse } from '../tweet/tweetResponse';
import { TweetService } from '../tweet/tweetservice';

@Component({
  selector: 'app-my-tweet',
  templateUrl: './my-tweet.component.html',
  styleUrls: ['./my-tweet.component.css']
})
export class MyTweetComponent implements OnInit {

  tweet:any;
  updateForm:FormGroup;
  msg:string;
  replyFlag:Array<boolean> = [false];
  updateStatus:Array<boolean> = [false];
  reply: Array<boolean> = [false];
  likeStatus: Array<boolean> = [false];
  userName:string = '';
  id: any;
  ress: any;
  tweets: any;
  replyDesc: String;
  idOpenedForEdit: any;
  constructor(private tweetService:TweetService,private router:Router) { }

  ngOnInit(): void {
    sessionStorage.setItem('twtflag',"mytweet");
    let user = JSON.parse(localStorage.getItem('loggedInUser'));
    this.tweetService.getUserTweet(user.email).subscribe((response)=>{
      this.tweet=response;
      this.dateConv(this.tweet);
      this.tweet.forEach(twt => {
        this.replydateConv(twt.replyList);
      });
    })

   this.updateForm = new FormGroup({
      'tweetId' : new FormControl(''),
      'tweetText' : new FormControl('',[Validators.required])
    })
    this.replyDesc = ''
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

  replydateConv(replyList){
    if(replyList){
    replyList.forEach(reply => {
      var tdate = new Date(reply.date).getTime();
      var date = new Date().getTime();
      var time = date-tdate;
      var mins = Math.floor(time / 60000);
      var hrs = Math.floor(mins / 60);
      var days = Math.floor(hrs / 24);
      var yrs = Math.floor(days / 365);
      if (mins < 60) {
        reply.date = mins + ' mins ago';
      }
      else if (mins > 60 && hrs <= 24) {
        reply.date = hrs + ' hours ago';
      }
      else {
        reply.date = days + ' days ago';
      }
    });
  }
  }

  delete(id){
    this.tweetService.deleteTweet(id).subscribe((response)=>{
      if(response){
        this.ngOnInit();
      }
    })
  }

  update(id){
    console.log(id);
  this.updateStatus[id]=true;
  this.idOpenedForEdit = id;
  }

  updateTweet(updateForm){
    updateForm.value.tweetId = this.idOpenedForEdit;
    this.tweetService.updateTweet(updateForm).subscribe((response:any)=>{
      if(response){
        this.updateStatus[this.idOpenedForEdit]=false;
        this.ngOnInit();
      }
    })
  }

  viewReply(id){
    this.replyFlag[id] = true;
  }

  hideReply(id){
    this.replyFlag[id] = false;
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

}
