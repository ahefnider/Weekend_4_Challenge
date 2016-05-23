  $(document).ready(function () {

    // call getList function to get the to do list to appear
    getList();
      // dataPrep();

    // event listener for the .intakeForm to add to do item
    $('#addToDo').on('submit', postToDo);
    $('.container').on('click', '.delete', deleted);
    $('.container').on('click', '.complete', completed);



    function dataPrep(button) {
      // get the movie data
      var list = {};
      console.log(button.parent().children());
      console.log(button.parent().children().serializeArray());
      $.each(button.parent().children().serializeArray(), function (i, field) {
        list[field.name] = field.value;
      });
    };

// This will delete a selected item from the list.

function deleted() {
     event.preventDefault();

     var taskid = $(this).parent().data('taskid');

     $.ajax({
       type: 'DELETE',
       url: '/ToDo/' + taskid,
       success: function (data) {
         getList();
        },
      });
    };


    function completed() {
         event.preventDefault();
         console.log('working');
        //  var preparedData = dataPrep($(this));
         var taskid = $(this).parent().data('taskid');
         var task = {
           taskid : taskid,
           completed : 'Yes'
         };
         $.ajax({
           type: 'PUT',
           url: '/ToDo/' + taskid,
           data: task,
           success: function (data) {
             appendComplete();
             getList();
            },
          });
        };

 // This will add a new todo item to the database

    function postToDo(event) {

           var values = {};

           $.each($('#addToDo').serializeArray(), function(i, field) {
             values[field.name] = field.value;
           });

         $.ajax({
           type: 'POST',
           url: '/ToDo',
           data: values,
           success: function (data) {
             // call getList again to refresh page with new item
             getList();
           },
         });
       };

// This function gets the list from the database. It's called multiple times.

function getList() {
event.preventDefault();
$('.container').empty();
$.ajax({
  type: 'GET',
  url: '/ToDo',
  success: function (todolist) {
    console.log(todolist);

    for (i = 0; i < todolist.length; i++) {
       appendDom(todolist[i]);
    }
  },
});
};

// appendDom is called to get the database items to the dom.
function appendDom(values) {
$('.container').append('<div class="toDoList"></div>');
var $el = $('.container').children().last();

$el.append('<p>TaskID ' + values.taskid + '</p>');
$el.append('<p>* ' + values.todo + ' *</p>');
$el.append('<p>Is this task completed? ' + values.completed + '</p>');
$el.data('taskid', values.taskid);
$el.append('<button class="complete">Complete</button>');
$el.append('<button class="delete">Delete</button>');
}


function appendComplete(values) {
  var $el = $('.toDoList').children().last();
  $el.append('<p>Complete</p>');
  $el.remove('.complete');
}

 });
