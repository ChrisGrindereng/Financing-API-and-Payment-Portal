function CheckEmail() {
    var Email = document.getElementById("ctl00_Main_txtEmail").value;

    if (Email != null && Email != '') {
        var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (reg.test(Email) == false) {


            //document.getElementById("spnCheckEmail").className = "caheck_avail_icon emailmsgnotdis";
            //document.getElementById("spnEmailAvailable").className = "caheck_avail_ac emailmsgnotdis";
            //document.getElementById("spnEmailNotAvailable").className = "caheck_avail_no emailmsgdis";
            //document.getElementById("SpnAvailabilityNo").innerHTML = 'Invalid';

            jQuery('#spnCheckEmail').show();
            jQuery('#spnEmailNotAvailable').hide();
            jQuery('#spnEmailAvailable').hide();
            jQuery('#spnCheckEmail').css('display', 'block');
            jQuery('#spnEmailNotAvailable').css('display', 'none');
            jQuery('#spnEmailAvailable').css('display', 'none');
            jQuery('#spnEmailAvailable').tooltip({
                title: 'E-mail is available',
                placement: "top",
                trigger: "manual"
            }).tooltip('hide');
            jQuery('#spnEmailNotAvailable').tooltip({
                title: 'E-mail already exists, please try another one.',
                placement: "top",
                trigger: "manual"
            }).tooltip('hide');
            return;
        }
        var UserID = document.getElementById("ctl00_Main_hdnLoginMasterId").value;
        var date = Date();
        $.getJSON("/Handler/CheckEmailExists.ashx?EmailID=" + Email + "&LoginMasterID=" + UserID + "&t=" + date, function (json) {
            $.each(json, function (i, result) {
                if (i == 'Value') {
                    if (result == "-1") {


                        //document.getElementById("spnCheckEmail").className = "caheck_avail_icon emailmsgnotdis";
                        //document.getElementById("spnEmailAvailable").className = "caheck_avail_ac emailmsgnotdis";
                        //document.getElementById("spnEmailNotAvailable").className = "caheck_avail_no emailmsgdis";
                        //document.getElementById("SpnAvailabilityNo").innerHTML = 'E-mail already exists, please try another one.';
                        //document.getElementById("SpnAvailabilityYes").innerHTML = '';

                        jQuery('#spnCheckEmail').hide();
                        jQuery('#spnEmailNotAvailable').css('display', 'block');
                        jQuery('#spnEmailAvailable').hide();
                        jQuery('#spnEmailNotAvailable').tooltip({
                            title: 'E-mail already exists, please try another one.',
                            placement: "top",
                            trigger: "manual"
                        }).tooltip('show');
                    }
                    else {


                        //document.getElementById("spnCheckEmail").className = "caheck_avail_icon emailmsgnotdis";
                        //document.getElementById("spnEmailAvailable").className = "caheck_avail_ac emailmsgdis";
                        //document.getElementById("spnEmailNotAvailable").className = "caheck_avail_no emailmsgnotdis";
                        //document.getElementById("SpnAvailabilityYes").innerHTML = 'E-mail is available';
                        //document.getElementById("spnEmailAvailable").title = 'E-mail is available';
                        jQuery('#spnCheckEmail').hide();

                        jQuery('#spnEmailNotAvailable').hide();
                        jQuery('#spnEmailAvailable').css('display', 'block');
                        jQuery('#spnEmailAvailable').tooltip({
                            title: 'E-mail is available',
                            placement: "top",
                            trigger: "manual"
                        }).tooltip('show');
                    }
                }
            });
        });
    }
    else {
        if ($(ctl00_Main_txtEmail).val() != '') {
            document.getElementById("ctl00_Main_txtEmail").focus();
        }
    }
}