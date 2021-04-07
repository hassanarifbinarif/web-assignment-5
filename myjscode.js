$(function () {
    ReqAjax();
    $("#recipes").on("click", ".btn-danger", DelProd);
    $("#btn").click(AddProd);
    $("#recipes").on("click", ".btn-warning", EditProd);

    $("#save").click(function () {
        var name = $("#Name").val();
        var price = $("#Price").val();
        var color = $("#ColorID").val();
        var department = $("#Department").val();
        var description = $("#Description").val();
        $.ajax({
            url: "https://usman-recipes.herokuapp.com/api/products",
            method: "POST",
            data: { name, price, color, department, description },
            success: function (result) {
                console.log(result);
                ReqAjax();
                $("#addmodel").modal("hide");
            },
        });
    });


    $("#UpdatedSave").click(function () {
        var id = $("#updateId").val();
        var name = $("#UpdateName").val();
        var price = $("#UpdatePrice").val();
        var color = $("#Updatecolor").val();
        var department = $("#UpdateDepartment1").val();
        var description = $("#UpdateDescription").val();
        $.ajax({
            url: "https://usman-recipes.herokuapp.com/api/products/" + id,
            data: { name, price, color, department, description },
            method: "PUT",
            success: function () {

                ReqAjax();
                $("#updatemodle").modal("hide");
            }
        });
    });
});

function DelProd() {
    var btn = $(this);
    var parent = btn.closest(".product");
    let id = parent.attr("data-id");
    console.log(id);

    $.ajax({

        url: "https://usman-recipes.herokuapp.com/api/products/" + id,
        method: "DELETE",
        success: function () {
            ReqAjax();
        },
    });
}

function EditProd() {
    var btn = $(this);
    var parent = btn.closest(".product");
    let id = parent.attr("data-id");
    $.get("https://usman-recipes.herokuapp.com/api/products/" + id, function (result) {

        $("#updateId").val(result._id);
        $("#UpdateName").val(result.name);
        $("#UpdatePrice").val(result.price);
        $("#Updatecolor").val(result.color);
        $("#UpdateDepartment1").val(result.department);
        $("#UpdateDescription").val(result.description);
        $("#updatemodle").modal("show");
    });
}

function AddProd() {
    $("#addmodel").modal("show");
}

function ReqAjax() {
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/products",
        method: "GET",
        success: function (result) {
            var req = $("#recipes");
            console.log(result);

            req.empty();
            for (var i = 0; i < result.length; i++) {
                var rec = result[i];
                req.append(`
              <div class="product" data-id="${rec._id}">
               <button class="btn btn-danger float-right">Delete</button> 
               <button class="btn btn-warning float-right">Update</button>
               <h3>Name:</h3><p>${rec.name}</p>
               <h3>Price:</h3><p>${rec.price}<p>
               <h3>Color:</h3><p>${rec.color}<p>
               <h3>Department:</h3><p>${rec.department}</p>
               <h3>Description:</h3><p>
                ${rec.description}</p>
              </div>`);
            }
        },
    });
}