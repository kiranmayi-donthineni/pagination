/**
 * Created by kavuri on 2/10/2017.
 */
/**
 * Created by kavuri on 1/31/2017.
 */

$(document).ready(function(){
    $("#userdata").hide();
    $("#pag1").hide();

    var employee = [];
    var totalRecords = 0;
    $(function() {
        $.getJSON('pagination.json', function(data) {
            $.each(data.employee, function(index, f) {

                var tblRow = "<tr>" + "<td>" + f.empId + "</td>" +
                    "<td>" + f.empName + "</td>" + "<td>" + f.empAC + "</td>" +  "</tr>";
                $(tblRow).appendTo("#userdata tbody");
                employee = data.employee;
                console.log("employee records are "+employee);
                totalRecords = employee.length ;
            });
            console.log("total records are   "+employee.length);
        });
    });

    function paginationLinks(pageNum){
        console.log("for checking "+pageNum);
        var text="";
        $("ul.pagination").empty();
        for(var i=0;i<pageNum;i++){
            text="<li>";
            text+="<a href='#'>";
            text+=(i+1);
            text+= "</a></li>";
            $("ul.pagination").append(text);

        }
        $("#pag1").show();
    }

    $("#selectDropdown li a").click(function(event){
        $("#userdata").hide();
        recordsPerPage = $(this).text();
        pageNum = Math.ceil(totalRecords/recordsPerPage);
        console.log("no.of pages "+pageNum);
        paginationLinks(pageNum);
    });
    $("ul.pagination").on('click',function(e){
        e.preventDefault();
        var page = parseInt($(e.target).text());
        console.log("page no:"+ page);
        $(e.target).parents("ul").children().removeClass("active");
        $(e.target).parent().addClass("active");

        showData(page);

    });
    function showData(page){
        console.log("records per page that user chose is "+ recordsPerPage);
        var startindex = (page-1)*recordsPerPage;
        console.log("start index is " + startindex);
        var endindex = startindex + recordsPerPage;
        console.log("end index is " + endindex);
        var employeesData = employee.slice(startindex,endindex);
        console.log("employeesData is "+employeesData);
        $("#datatable").empty();
        var text;
        for(var i=0;i<recordsPerPage;i++){
            text="<tr>";
            text+="<td>" +  employeesData[i].empId+ "</td>";
            text+="<td>" +  employeesData[i].empName+"</td>";
            text+= "<td>" +  employeesData[i].empAC +"</td>";
            text+= "</tr>";
            console.log(" records are  "+text);

            $("#datatable").append(text);
        }
        $("#userdata").show();
        console.log("showing data");
    }
});
