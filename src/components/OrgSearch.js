import Cancel from "../img/cancel.png";
import axios from "axios";
import {useContext} from "react";
import {ChatContext} from "../context/ChatContext";
import {useForm} from "react-hook-form";
const OrgSearch = () => {
    const { setUsers, setIsClosed } = useContext(ChatContext)
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();
    const onSubmit = (data) => {
        // prevent page reload
        //e.preventDefault();
        console.log(data)
        const url = process.env.REACT_APP_API_URL + "search_users/org/"
        const orgInfo = {
            comp_name: data.company,
            dept_name: data.department
        }
        axios.post(url, orgInfo, {
            headers:{"Authorization": localStorage.getItem("token")}
        }).then(
            res =>{
                setUsers(res.data)
                console.log(res.data)
            }
        ).catch(
            err => {
                console.error('Error fetching data:', err);
            }
        )
    }

    const closeWindow = () => {
        setIsClosed(true)
    }
    return(
        <div className="orgSearch">
            <div className="title">

                <p>Search by Organization</p>
                <img src={Cancel} alt="" onClick={(e) => closeWindow()}/>

            </div>
            <div className="orgInfo">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder={errors.company?errors.company.message:"company"}
                        {...register('company', {
                            required: 'Must not be empty',
                        })}
                    />
                    <input
                        type="text"
                        placeholder={errors.department?errors.department.message:"department"}
                        {...register('department', {
                            required: 'Must not be empty',
                        })}
                    />
                    <button>Search</button>
                </form>

            </div>
        </div>
    )
}
export default OrgSearch