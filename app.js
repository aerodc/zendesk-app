(function() {

  return {
    events: {
      'postTicketInfoRequest.done': 'this.showInfo',
      'postTicketInfoRequest.fail': 'this.showError',
      'app.activated':'getInfo',
      'click #my-btn': 'this.postAgain'
    },
    
    requests:{
        
        postTicketInfoRequest:function(ticketInfo){

            return{
                 url: 'https://qqglab9xh0mf.runscope.net',
                 type: 'post',
                 dataType: 'json',
                 data: ticketInfo
            };
            
        }
    },

    getInfo: function() {
        var ticket = this.ticket();
        var user = ticket.requester();

        var ticketInfo={
            "ticket_id": ticket.id,
            "ticket_subject":ticket.subject,
            "user_id":user.id,
            "sent_date": new Date().toJSON().slice(0,19).replace("T"," "),
            "ticket_status":ticket.status,
            "ticket_priority":ticket.priority
        };
        
        this.store('ticketInfo',ticketInfo);
        
        this.ajax('postTicketInfoRequest',ticketInfo);
        
    },
    
    showInfo: function(data){
        this.switchTo('success', data);
    },
    
    showError:function(data) {
        this.switchTo('error', data);
    },
    
    postAgain:function(){
        
        var ticketInfo=this.store('ticketInfo');
        this.getInfo(ticketInfo);
    }
    
    
  };

}());
