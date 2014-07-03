/*
Twitter Bootstrap Popover using a Knockout Custom Binding with KO Validation
*/
ko.bindingHandlers.validationPopover = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            //Initialize the popover on the given element
            $(element).popover({
                placement: function () { return $(element).data("position") != "" ? $(element).data("position") : "top" }, //you can use data-position if you want to change the position on the element
                trigger: 'manual',
                container: 'body',
                title: '', //for my case, I dont want to use the title
                content: function () { return $(element).attr('title') }, //I want to use the title on the element for the content instead
                template: '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>' //remove the title from the popover html
            });

			//Make sure that we dispose of the popover, otherwise it will "hang around"
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element).popover('destroy');
            });
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            // First get the latest data that we're bound to
            var value = valueAccessor();
            //If the observable is not valid, check to see if there is a has-error class on the element
            if (!value.isValid()) {
                if ($(element).hasClass("has-error")) {
                    $(element).popover('show');
                }
            }
            else $(element).popover('hide');
        }
    }