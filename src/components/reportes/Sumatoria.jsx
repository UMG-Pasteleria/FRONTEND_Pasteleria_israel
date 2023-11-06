import React from "react";
import { useNavigate } from "react-router-dom";

//import styled from 'styled-components';
//import Modal from './componentes/modal';
import { useForm } from "react-hook-form";


function Sumatoria({ data }) {
    const total = data.reduce((sum, row) => sum + row.valor, 0);
 
   return (
      <div>Total: {total}</div>
    );
  }
  
 