import React, { useState, useRef, useEffect } from "react";
import Papa from "papaparse";
import BubbleMap from "../maps/BubbleMap";
import WorldAtlasJson from "../maps/MapJson";
import * as mapUtils from "../maps/MapUtils";
import * as setupUtils from "./SetupUtils";

// Bootstrap
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const axios = require('axios');