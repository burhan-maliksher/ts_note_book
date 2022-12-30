#! /usr/bin/env node
// Develop a simple command line Todo app using TypeScipt, Node.js and Inquirer.
import inquirer from "inquirer";
import chalk from "chalk";
// import chalkAnimation from "chalk-animation";
import chalkAnimation from "chalk-animation";
import { title } from "process";



// type todo list
type List = {
  autor: string;
  date: string;
  subject: string;
  list: string;
};

// todo class
class Todo_list {
  private _all_list!: List[];
  private _view_a_list!: List;
  // private titleAwait!:any;  
 

constructor() {
  // this.titleAwait=null;
  // this.titlePlay();
  console.log(chalk.yellow.bgRedBright.bold(`                   'MB Note Book'              Autor: "M.B"`));

  this.main();

  // this.title();
  }
// async titlePlay(){this.titleAwait=await this.title()}
private async title(){
    const show=chalkAnimation.rainbow(`_____________'Thanks For Using MB Note Book'_______________`);
    const stopAnimation=()=>{
     return new Promise((resolve) => {
         setTimeout(resolve,2000);  
     });
    }
    await stopAnimation();
    show.stop();    
    console.log(chalk.yellow.bgRedBright.bold(`                                               Autor: "M.B"`));

    // title end
  }

  // main menu method
public async main() {
    const main_menu = await inquirer.prompt(
      [
      {
        type: "list",
        name: "main_menu_list",
        message: "choose one to proceed",
        choices: ["Add Todo List", "View Todo List", "Exit"],
      },
    ]
    );
    if (main_menu.main_menu_list === "Add Todo List") {
      let addList = await this.user_input();
    } else if (main_menu.main_menu_list === "View Todo List") {
      let editList = await this.view_todo_list();
    } else {
      this.title();

      // console.log("Thanks for using Todo List by 'M.B'");
    }

    // end of main 
  }

  // user input method
private async user_input(): Promise<void> {
    let prompt_loop: boolean;
    let list;
    let get_list: List;
    let all_list: List[] = [];

    do {
      let i=0
      i++
      list = await inquirer.prompt([
        {
          type: "input",
          name: "todo_Writter",
          message: "Please Enter your Name",
          default:`untiteled writter${i}`,
        },
        {
          type: "input",
          name: "todo_Date",
          message: "Please Enter Date for list",
          default:`untiteled`,
        },
        {
          type: "input",
          name: "todo_Subject",
          message: "Please Enter the Subject of Todo List",
          default:`untiteled subject${i}`,
        },
        {
          type: "editor",
          name: "todo_List",
          message: "Please Enter your Todo List",
        },
        {
          type: "confirm",
          name: "continue_or_not",
        },
      ]);
      prompt_loop = list.continue_or_not;

      get_list = {
        autor: list.todo_Writter,
        date: list.todo_Date,
        subject: list.todo_Subject,
        list: list.todo_List,
      };
      all_list.push(get_list);
    } while (prompt_loop === true);

    this._all_list = all_list;
    this.backOrExit();

    // end of user input
  }

  //view todo list
private async view_todo_list() {
    let view: List[] = this._all_list;
    
    if (view !== undefined  && view.length!==0) {
      const view_list = await inquirer.prompt([
        {
          type: "list",
          name: "view_list_by",
          choices: ["autor", "date", "subject"],
        },
      ]);
      const view_list1 = await inquirer.prompt([
        {
          type: "list",
          name: "view_resulted_list_of",
          message: "choose one to see todo list",
          choices: function () {
            let match = view_list.view_list_by;
            if (match === "autor") {
              const _autor: string[] = view.map((item) => item.autor);
              return _autor;
            } else if (match === "date") {
              const _date: string[] = view.map((item) => item.date);
              return _date;
            } else if (match === "subject") {
              const _subject: string[] = view.map((item) => item.subject);
              return _subject;
            }
          },
          filter: function (value) {
            const find_list = view_list.view_list_by;
            if (find_list === "autor") {
              const resulted_list = view.find((list) => list.autor === value);
              return resulted_list;
            } else if (find_list === "date") {
              const resulted_list = view.find((list) => list.date === value);
              return resulted_list;
            } else if (find_list === "subject") {
              const resulted_list = view.find((list) => list.subject === value);
              return resulted_list;
            }
          },
        },
      ]);
      this._view_a_list = view_list1.view_resulted_list_of;
      console.log(view_list1.view_resulted_list_of);
      const default_value = view_list1.view_resulted_list_of;

      const editOrDelete_view_list = await inquirer.prompt([
        {
          type: "list",
          name: "choice",
          choices: ["Edit", "Delete", "Exit/Back to Main"],
        },
      ]);
      
      switch (editOrDelete_view_list.choice) {  
        case "Edit":
          const edit_view_list = await inquirer.prompt(
            [
            {
              type: "input",
              name: "todo_Writter",
              message: "Please Enter your Name",
              default: default_value.autor,
            },
            {
              type: "input",
              name: "todo_Date",
              message: "Please Enter Date for list",
              default: default_value.date,
            },
            {
              type: "input",
              name: "todo_Subject",
              message: "Please Enter the Subject of Todo List",
              default: default_value.subject,
            },
            {
              type: "editor",
              name: "todo_List",
              message: "Please Enter your Todo List",
              default: default_value.list,
            },
          ]
          );
          let get_edit_list: List = {
            autor: edit_view_list.todo_Writter,
            date: edit_view_list.todo_Date,
            subject: edit_view_list.todo_Subject,
            list: edit_view_list.todo_List,
          };
  
          const indexedit = view.indexOf(default_value);
          this._all_list.splice(indexedit,1,get_edit_list);
          console.log(this._all_list[indexedit]);
          console.log(chalk.bgGreen("edited succesfully"));
          this.backOrExit();
          break;
        case "Delete":
          const indexdel = view.indexOf(default_value);
          this._all_list[indexdel];
          // console.log(this._all_list);
          this._all_list.splice(indexdel, 1);
          console.log(this._all_list[indexdel]);
          console.log(chalk.bgRed("deleted succesfully"));
          
          this.backOrExit();
          break;
        case "Exit/Back to Main":
          this.backOrExit();
          break;  
       } 
    } else {
      console.log("No list added yet!");
      // main menu or exit
      this.backOrExit();
    }
  // end of view todo list
  }

private async backOrExit() {
    const back_exit = await inquirer.prompt([
      {
        type: "list",
        name: "main_exit",
        message: "choose one to proceed",
        choices: ["Main", "Exit"],
      },
    ]);

    let userOption: string = back_exit.main_exit;
    if (userOption === "Main") {
      this.main();
    } else {
      this.title();
      // console.log("Thanks for using Todo List by 'M.B'");
    }

    // end of backorexit
  }

// end of class
}

let first = new Todo_list();
// let main=first.main();