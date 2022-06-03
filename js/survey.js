"use strict";
jQuery(function ($) {
  $("form#wrapped").attr("action", "save_data.php");
  $("#wizard_container")
    .wizard({
      stepsWrapper: "#wrapped",
      submit: ".submit",
      beforeSelect: function parse(shortCircuit, _parseFn) {
        if ($("input#website").val().length != 0) {
          return false;
        }
        if (!_parseFn.isMovingForward) {
          return true;
        }
        var params = $(this).wizard("state").step.find(":input");
        return !params.length || !!params.valid();
      },
    })
    .validate({
      errorPlacement: function mergeChildren(parent, node) {
        if (node.is(":radio") || node.is(":checkbox")) {
          parent.insertBefore(node.next());
        } else {
          parent.insertAfter(node);
        }
      },
    });
  $("#progressbar").progressbar();
  $("#wizard_container").wizard({
    afterSelect: function compile(ngAttrs, jqmAttrs) {
      $("#progressbar").progressbar("value", jqmAttrs.percentComplete);
      $("#location").text(
        "(" + jqmAttrs.stepsComplete + "/" + jqmAttrs.stepsPossible + ")"
      );
    },
  });
  $("#wrapped").validate({
    ignore: [],
    rules: { select: { required: true } },
    errorPlacement: function translate(options, data) {
      if (data.is("select:hidden")) {
        options.insertAfter(data.next(".nice-select"));
      } else {
        options.insertAfter(data);
      }
    },
  });
});
function getVals(key, filter) {
  switch (filter) {
    case "question_1":
      var value = $(key).val();
      $("#question_1").text(value);
      break;
    case "question_2":
      value = $(key).val();
      $("#question_2").text(value);
      break;
    case "question_3":
      var versionByName = $(key).attr("name");
      value = [];
      $("input[name*='" + versionByName + "']").each(function () {
        if (jQuery(this).is(":checked")) {
          value.push($(this).val());
        }
      });
      $("#question_3").text(value.join(", "));
      break;
    case "additional_message_3":
      value = $(key).val();
      $("#additional_message_3").text(value);
      break;
  }
}
