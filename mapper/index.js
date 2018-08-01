/*var sourceJson = {'a':'b'}
var destDefinition ={'c':'d'}

var jsonTranslate = require("json-translate");
var newJson = jsonTranslate(sourceJson, destDefinition);

var jsonDest = {
	q1Grades: ["students", ["grades",["q1"]]],
	name: ["students", ["name"]]
 
}

var jsonIs = {
students: [
    {
        name: "Student 1",
        grades: [
            {
                q1: "A",
                q2: "A+",
                q3: "D",
                q4: "D+"
            }
        ]
    },
    {
        name: "Student 2",
        grades: [
            {
                q1: "B",
                q2: "B+",
                q3: "E",
                q4: "E+"
            }
        ]
    },
    {
        name: "Student 3",
        grades: [
            {
                q1: "C",
                q2: "C+",
                q3: "F",
                q4: "F+"
            }
        ]
    },
]
};
var new1Json = jsonTranslate(jsonIs, jsonDest);
console.log("Hello");
console.log(new1Json);









var data = {
    "posts" : [
        {
            "title" : "title1",
            description: "description1",
            blog: "This is a blog.",
            date: "11/4/2013",
            extra : {
                link : "http://goo.cm"
            },
            list1:[
                {
                    name:"mike"
                }
            ],
            list2:[
                {
                    item: "thing"
                }
            ],
            clearMe: "text"
        },
		 {
            "title" : "title1",
            description: "description1",
            blog: "This is a blog.",
            date: "11/4/2013",
            extra : {
                link : "http://goo.cm"
            },
            list1:[
                {
                    name:"mike"
                }
            ],
            list2:[
                {
                    item: "thing"
                }
            ],
            clearMe: "text"
        }
    ]
};

var map = {
    list : 'posts',
    item: {
        name: "title",
        info: "description",
        text: "blog",
        date: "date",
        link: "extra.link",
        item: "list1.0.name",
        clearMe: "",
        fieldGroup: ['title', 'extra']
    },
    operate: [
        {
            run: "Date.parse", on: "date"
        },
        {
            run: function(val) { return val + " more info"}, on: "info"
        }
    ]
};
var dataTransform = DataTransform(data, map);
var result = dataTransform.transform();
console.log(result);

console.log("--------------------------------------====================--------------")
*/
var DataTransform = require("node-json-transform").DataTransform
var jsonInputFile = require("./input")

var summaryMapper = {
	list : 'input',
    item: {
        workflowName: "",
		worfklowReferenceId : "workflowTestRefId",
		role: "wfOrigin" ,
		channel: "",
		workflowType: "",
		status: "",
		technologyType: "accessTechnology",
		accessekerId: "accessSeekerId",
		testDetails: "testDetails"
    },
	operate: [
        {
			//Mapper for Test Details
            run: function(testData) 
			{ 
				return DataTransform({list:testData}, testDataMapper).transform();
			}, 
			on: "testDetails"
        }
    ],
	//Addition Logic for Multiple Element
    each: function(item){
        return item;
    }
}

var testDataMapper = {
	'list': 'list',
	'item' : {
		testName: "testName",
		status: "response",
		resolutionText: "resolution",
		timeStamp: "executionTs"
	}, 
	operate: [
        {	
			// Status Mapper
            run: function(status) 
			{ 
				return status === 3 ? "Passed": "Failed";
			}, 
			on: "status",		
			//Resolution Mapper
			run: function(resolution) 
			{ 
				return "Need to Do loopkup from Config Server"
			}, 
			on: "resolutionText"
			
        }
    ]

};

var dataTransform = DataTransform(jsonInputFile, summaryMapper);
var result1 = dataTransform.transform();
console.log(JSON.stringify(result1));





















