
 
let taskData=[];
let addBtn=document.getElementById("addTask");
let sortBtn=document.getElementById("sort");
let DeleteItemsBtn=document.getElementById("DeleteItems");



class Tasks
{
    #status;
    
    constructor(id,name,periority,editMode,status,checked){
        this.id=id;
        this.name=name;
        this.periority=periority;
        this.editMode=editMode;
        this.#status=status;
        this.checked=checked; 
    }
    setId(id){
        return this.id=id;
    }
    getId(){
        return this.id;
    }

    setName(name){
        return this.name=name;
    }
    getName(){
        return this.name;
    }

    setPeriority(periority){
        return this.periority=periority;
    }
    getPeriority(){
        return this.periority;
    }

    setStatus(status){
        return this.#status=status;
    }
    getStatus(){
        return this.#status;
    }

      validation(name,periority){
        let count=0;
        let repeatChech=false;
        let taskNameCheck=false;
        let periorityCheck=false;
        for(let j=0;j<taskData.length;j++)
        {
            if(name===taskData[j].name)
            {
                count++;
            }
        }
        if(count==0)
        {
          repeatChech=true;
          
        }
        else{
            alert("repeated task");
        }
        if(!(name.length>10||name===""))
        {
            taskNameCheck=true;
        }
        if(!(Number(periority)===NaN||Number(periority)<1))
        {
            periorityCheck=true;
        }
        if(taskNameCheck===true&&periorityCheck===true&& repeatChech===true)  
        {
            return true;
        } 
    }

}

let addTask=addBtn.addEventListener("click",function(){
    let taskName=document.getElementById("taskName").value;
    let periority=document.getElementById("Periority").value;
    let  id=taskData.length+1;
    let  editMode=false;
    let  status=true;
    let  checked=false;
    let task=new Tasks(id,taskName,periority,editMode,status,checked);
    let validate=task.validation(taskName,periority);
    if(!validate)
    {
     alert("Data not valid ,Try again");
     return;
    }
    addData(task);
    display();
})

let addData=function(task)
{
  taskData.push(task);
}

let display=function()
{
    let tableRows=  `<tr>
                        <th>Check Box</th>
                        <th>No</th>
                        <th>Task Name</th>
                        <th>Periority</th>
                        <th>Delete</th>
                        <th>Edit</th>
                        <th>Status</th>
                      </tr>`
    for(let i=0 ;i<taskData.length;i++)
    {
      let No=i+1;
      tableRows+=`<tr>
        <td><input type="checkbox" id="${i}" onclick="checkClickFunc(${i})"></td>
        <td>${No}</td>
        <td>${taskData[i].editMode ? `<input type="text" id="name" value="${taskData[i].name}"/>`: taskData[i].name}</td>
        <td>${taskData[i].editMode ? `<input id="per" value="${taskData[i].periority}"/>`: taskData[i].periority}</td>
        <td><button class="remove" onclick="deleteRow(${i})">Delete</button></td>
        <td>${taskData[i].editMode? `<button class="save" onclick="saveEdit(${i})">Save</button>
        <button class="cancel" onclick="cancelEdit(${i})">Cancel</button>`
        : `<button class="edit" onclick="editRow(${i})">Edit</button>`}
        </td>
        <td>${taskData[i].getStatus()? `<button class="state1" onclick="statusValue(${i})">Pending</button>`
        : `<button class="state2" onclick="statusValue(${i})">Done</button>`}
        </td>
        </tr>`                         
    }
    document.getElementById("dataTable").innerHTML=tableRows;
  fSort();

}

let deleteRow=function(index)
{
    taskData.splice(index,1);
    display();
}


let saveEdit=function(index)
{
    taskData[index].name=document.getElementById("name").value;
    taskData[index].periority=document.getElementById("per").value;
    taskData[index].editMode=false;
    display();
}

let editRow=function(index)
{
    taskData[index].editMode=true;
    display();
}

let cancelEdit=function(index)
{
    taskData[index].editMode=false;
    display();
}

let fSort=function(){
    let sorting=sortBtn.addEventListener("click",function(){
        taskData.sort(function (a, b) {
            return a.periority - b.periority;
        });
       
        display();    
    })
    }

 let statusValue=function(index)
 {
    let check=taskData[index].getStatus();
    if(check===true)
    {
        taskData[index].setStatus(false);
    }
    else
    {
        taskData[index].setStatus(true);
    }

    console.log(taskData[index].getStatus());
    display();
 }


 function checkClickFunc(index)
 {
  let checkbox = document.getElementById(index);
  
  if (checkbox.checked == true)
  {
    taskData[index].checked=true;
  }
 
  console.log(taskData);
}




 let deleteItems=DeleteItemsBtn.addEventListener("click",function(index){
    let ind=[];
    for(let i=0;i<taskData.length;i++)
    {
        
        if(taskData[i].checked==true)
        {
            ind.push(taskData[i].id);
        }
    }
    for(let k=0;k<ind.length;k++)
    {
        for(let j=0;j<taskData.length;j++)
        {
            if(ind[k]==taskData[j].id)
            {
                taskData.splice(j,1);
                break;
            }
        }
    }
  display();

 })





























































