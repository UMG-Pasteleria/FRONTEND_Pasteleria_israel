import React from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

function SearchBar({ searchQuery, setSearchQuery }) {
   return (
     <input
       type="text"
       value={searchQuery}
       onChange={e => setSearchQuery(e.target.value)}
       placeholder="Buscar..."
    />
   );
 }