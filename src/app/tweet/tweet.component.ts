import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { loginResponse } from '../response';
import { tweetResponse } from './tweetResponse';
import { TweetService } from './tweetservice';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {

  postTweetForm:FormGroup;
  tweets:any;
  reply: Array<boolean> = [false];
  replyDesc: String;
  likeStatus: Array<boolean> = [false];
  userName:string = ''
  postFlag:boolean = false;
  ress: any;
  loading: boolean = false;
  posting: boolean = false;
  constructor(private tweetService:TweetService) {
    this.replyDesc= '';
   }

  ngOnInit(): void {
    this.userName = JSON.parse(localStorage.getItem('loggedInUser')).email;
    this.postTweetForm = new FormGroup({
      'tweetDes': new FormControl('',[Validators.required,Validators.maxLength(144)]),
    })
    this.loading = true;
    this.tweetService.getAllTweets().subscribe((response:any)=>{

      this.setTweets(response);
    })
  }

  setTweets(response: any){
    this.ress = response as tweetResponse[];
    this.ress.sort((a, b) => new Date(b.tweetDate).getTime() - new Date(a.tweetDate).getTime());
    this.tweets=this.ress;
    console.log(this.tweets);
    this.dateConv(this.tweets);
    this.loading = false;
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

  // replydateConv(replyList){
  //   if(replyList){
  //   replyList.forEach(reply => {
  //     var tdate = new Date(reply.date).getTime();
  //     var date = new Date().getTime();
  //     var time = date-tdate;
  //     var mins = Math.floor(time / 60000);
  //     var hrs = Math.floor(mins / 60);
  //     var days = Math.floor(hrs / 24);
  //     var yrs = Math.floor(days / 365);
  //     if (mins < 60) {
  //       reply.date = mins + ' mins ago';
  //     }
  //     else if (mins > 60 && hrs <= 24) {
  //       reply.date = hrs + ' hours ago';
  //     }
  //     else {
  //       reply.date = days + ' days ago';
  //     }
  //   });
  // }
  // }

  post(){
    this.postFlag=true;
  }

  posttweet(postTweetForm) {
    this.posting = true;
    this.tweetService.postNewTweet(postTweetForm).subscribe(_ => {
      this.tweetService.getAllTweets().subscribe((response:any)=>{
        this.postTweetForm.get('tweetDes').setValue('');
        this.setTweets(response);
        this.posting = false;
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

  likeTweet(id){
    this.tweetService.likeTweet(id).subscribe(_=>{
      this.likeStatus[id] = true;
      this.tweetService.getAllTweets().subscribe((response:any)=>{
        this.postTweetForm.get('tweetDes').setValue('');
        this.setTweets(response);
      });
    });
  }


  unlike(id: any) {
    this.tweetService.unLikeTweet(id).subscribe(_=>{
      this.likeStatus[id] = true;
      this.tweetService.getAllTweets().subscribe((response:any)=>{
        this.postTweetForm.get('tweetDes').setValue('');
        this.setTweets(response);
      });
    });
  }


}
