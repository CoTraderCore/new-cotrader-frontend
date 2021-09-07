import { useContext, useState, useEffect } from "react";
import { FundContext } from './Context'
import { APIEnpoint } from "./config";
import FundStore from './FundStore'
import { observer, inject } from "mobx-react";
const Currentfunds=()=>{
  const {userData, setUserData}= useContext(FundContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
           
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
    
      const count = Math.ceil(FundStore.SmartFundsOriginal.length / postsPerPage);
      
      const handleChange = (event, value) => {
        setCurrentPage(value);
      };

      useEffect(() => {
      
  
          const getFetch = async () => {
            const response = await fetch(APIEnpoint);
            const jsonData = await response.json();
            // console.log(jsonData)
      
            FundStore.initSFList(jsonData.result);
            setUserData(FundStore.SmartFunds);
           
          };
      
          getFetch();
        }, []);
    
      return  FundStore.SmartFundsOriginal.slice(indexOfFirstPost, indexOfLastPost)
    
    }

export default inject('FundStore')(observer(Currentfunds));
