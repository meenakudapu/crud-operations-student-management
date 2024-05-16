


function getData(){
    axios.get("http://localhost:3000/users")
    .then(res=>{
        displayData(res.data);
        
    })
    
}

function createData(){
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const branch = document.getElementById("branch").value;
    const email = document.getElementById("email").value;



    axios.post("http://localhost:3000/users", {
      
       id: id,
       name: name,
       branch: branch,
       email: email
    })
    .then(res => {
            getData();   
    })
    
}


function displayData(data) {
    const userDataTable = document.createElement("table");
    userDataTable.innerHTML = `
               
    
        <thead>
            <tr>
                <th>\t ID \t</th>
                <th>\t Name \t</th>
                <th>\t Branch\t</th>
                <th>\t Email\t</th>
                <th>\t Options\t</th>
            </tr>
        </thead>
        <tbody id="userDataBody">
        </tbody>
    `;

    const tableBody = userDataTable.querySelector("#userDataBody");

    data.forEach(user => {
        const row = document.createElement("tr");
      
        row.innerHTML = `
              <td>${user.id}</td>
              <td>${user.name}</td>
              <td>${user.branch}</td>
              <td>${user.email}</td>
              <td>
                 <button style="font-size: 24px;" onclick="deleteData('${user.id}')"><i class="fa fa-trash-o"></i></button>
                 <button style="font-size: 24px;" onclick="updateData('${user.id}')"><i class="fa fa-edit"></i></button>
              </td>
                  `;

        tableBody.appendChild(row);
    });

    const userDataDiv = document.getElementById("userData");
    userDataDiv.innerHTML = "";
    userDataDiv.appendChild(userDataTable);
}
function deleteData(id) {
    axios.delete(`http://localhost:3000/users/${id}`)
        .then(res => {
            getData(); // Refresh the table after successful deletion
        })
        .catch(error => console.log(error));
}

function updateData(id) {
    const email = prompt("Enter new email:");

    axios.patch(`http://localhost:3000/users/${id}`, {
        email: email
    })
    .then(res => {
        getData(); // Refresh the table after successful update
    })
    .catch(error => console.log(error));
}
window.onload = function() {
    getData();
};