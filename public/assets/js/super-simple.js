/*
var simple_chart_config = {
	chart: {
		container: "#OrganiseChart-simple"
	},
	
	nodeStructure: {
		text: { name: "Parent node" },
		children: [
			{
				text: { name: "First child" }
			},
			{
				text: { name: "Second child" }
			}
		]
	}
};
*/
// // // // // // // // // // // // // // // // // // // // // // // // 

var config = {
	container: "#OrganiseChart-simple"
};

var parent_node = {
	text: { name: "Parent node" }
};

var first_child = {
	parent: parent_node,
	text: { name: "First child" }
};

var second_child = {
	parent: parent_node,
	text: { name: "Second child" }
};

var third_child = {
	parent: second_child,
	text: { name: "Second child's first_child" }
};

var fourth_child = {
	parent: second_child,
	text: { name: "Second child's second_child" }
};

var simple_chart_config = [
	config, parent_node,
		first_child, second_child,
			third_child, fourth_child,
];