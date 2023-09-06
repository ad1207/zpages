'use client'
import { useState, useEffect } from "react"
import { Edit, DeleteForever } from "@mui/icons-material"
import { Button, ButtonGroup } from "@mui/material"

var jsonData=[{
    "id":1,
    "firstName" : "RR Guest",
    "lastName"  :"Y",
    "email" : "msedwick@sed.com",
    "status" : "Active",
    "phoneNo" : "9874563215",
    "role":"Admin"
},
{
    "id":2,
    "firstName" : "RR Guest",
    "lastName"  :"K",
    "email" : "jamie@denton.com",
    "status" : "Active",
    "phoneNo" : "9865321478",
    "role":"Admin"
},
{
    "id":3,
    "firstName" : "DC Law",
    "lastName"  :"h",
    "email" : "daisy@texasjus.com",
    "status" : "Active",
    "phoneNo" : "9632587411",
    "role":"Admin"
},
{
    "id":4,
    "firstName" : "Morgan",
    "lastName"  :"B",
    "email" : "nborrego@forth.com",
    "status" : "Active",
    "phoneNo" : "8956231478",
    "role":"Admin"
}]


const UserList = (props) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        initBlogs();
    }, []);

    const initBlogs = () => {
        setUsers(jsonData);
    };

    const listUsers = () => {
        return (			
            users &&
			users?.map((t, i) => (
			    <div key={i} style={i % 2 == 0 ? styles.body : styles.body2}>
			        <div>{i + 1}</div>
			        <div>
			            <span style={styles.spacing}>{t.firstName}</span>
			        </div>
			        <div>
			            <span style={styles.spacing}>{t.lastName}</span>
			        </div>
			        <div>
			            <span style={styles.spacing}>{t.email}</span>
			        </div>
			        <div>
			            <span style={styles.spacing}>{t.phoneNo}</span>
			        </div>
			        <div>
			            <span style={styles.spacing}>{t.status}</span>
			        </div>
			        <div>
			            <span style={styles.spacing}>{t.role}</span>
			        </div>

			        <div style={{ cursor: "pointer" }}>
			            <ButtonGroup size="small">
			                <Button onClick={() => props.onAction('edit', t.id)}><Edit/></Button>
			                <Button ><DeleteForever /></Button>
			            </ButtonGroup>
			        </div>
			    </div>
			))

        );
    };

    return (
        <>
            <div style={{
                fontSize: '2rem',
                fontWeight: "bold"
            }}> Users
            </div>
            <div style={{ margin: "10px 0" }}>{users.length} entries found</div>
            <div>
                <div style={styles.tHead}>
                    <div> #</div>
                    <div style={styles.tittle}>First Name</div>
                    <div style={styles.tittle}>Last Name</div>
                    <div style={styles.tittle}>Email</div>
                    <div style={styles.tittle}>Phone No</div>
                    <div style={styles.tittle}>Status</div>
                    <div style={styles.tittle}>Role</div>
                    <div >Action</div>
                </div>

                {listUsers()}
            </div>



        </>


    );
};

const styles = {
    "spacing":{cursor: 'pointer', fontSize: '1rem', padding: '0px 6px'},
    "tittle": {
        padding: '0px 6px'
    },
    "body": {
        display: 'grid', padding: '6px 6px',
        width: '100%',
        margin: '0 auto',
        fontWeight: "lighter",
        backgroundColor: "#f5f5f5",
        gridTemplateColumns: '30px 1fr 1fr 1fr 1fr 1fr 1fr 100px'
    },
    "body2": {
        display: 'grid', padding: '6px 6px',
        width: '100%',
        margin: '0 auto',
        fontWeight: "lighter",
        backgroundColor: "#fff",
        gridTemplateColumns: '30px 1fr 1fr 1fr 1fr 1fr 1fr 100px'
    },
    "tHead": {
        display: 'grid',
        gridTemplateColumns: '30px 1fr 1fr 1fr 1fr 1fr 1fr 100px',
        padding: '6px 6px',
        fontSize: '1rem',
        fontWeight: "bold",
        backgroundColor: '#e7e7e7',
        width: '100%',
        margin: '0 auto'
    }

}

export default UserList;



