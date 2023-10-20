import React from "react";
import { useNavigate } from "react-router-dom";

//import styled from 'styled-components';
//import Modal from './componentes/modal';
import { useForm } from "react-hook-form";

function DateRangePicker({ startDate, endDate, setStartDate, setEndDate }) {
    return (
       <div>
         <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </div>
      );
    }