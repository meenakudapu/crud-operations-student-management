function getData(){
    fetch("http://localhost:3000/users")
    .then(res=>res.json())
    .then(data=>{
        displayData(data);
        showMessage("Data fetched successfully.");
    })
    .catch(error => showMessage("Error fetching data: " + error));
}

function deleteData(){
    const id = document.getElementById("id").value;
    fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE"
    })
    .then(res => {
        
            getData(); 
       
    })
    .catch(error => console.log(error));
}

function createData(){
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const branch = document.getElementById("branch").value;
    const email = document.getElementById("email").value;

    const newData = {
        id: id,
        name: name,
        branch: branch,
        email: email
    };

    fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newData)
    })
    .then(res => {
            getData();   
    })
    .catch(error => console.log(error));
}
function patchData() {
    const id = document.getElementById("id").value;

    const email = document.getElementById("email").value;
    fetch(`http://localhost:3000/users/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
          
        }),
    })
    .then(res => {
      
        // Assuming getData() updates UI or performs some action after successful patching
        getData(); 
    })
    .catch(error => console.error('Error patching user data:', error));
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
               
            </tr>
        </thead>
        <tbody id="userDataBody">
        </tbody>
    `;

    const tableBody = userDataTable.querySelector("#userDataBody");

    data.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>\t ${user.id} \t</td>
            <td>\t ${user.name}\t </td>
            <td>\t ${user.branch}\t</td>
            <td>\t ${user.email}\t</td>
        `;
        tableBody.appendChild(row);
    });

    const userDataDiv = document.getElementById("userData");
    userDataDiv.innerHTML = "";
    userDataDiv.appendChild(userDataTable);
}

