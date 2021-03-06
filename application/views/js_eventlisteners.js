//Event Listeners

$('#selclient').change(function(event) {
	subkeywordsarr = [];
	tvarr = [], varr = [], earr = [], pcarr = [];

	salertloading(isTouchDevice());

	cid = $(this).children(':selected').attr('data-clientid');
	cliid = cid;
	cname = event.target.value;
	console.log('Client ID: '+cid);
	console.log('Client Name: '+cname);

	$('#btnnpapper').attr({
		'href': 'http://v22.multclipp.com.br/banca/?path='+cid,
		'target': '_blank'
	});

	load_data('startpage', cid, todaydate, todaydate);
});

$('#bannerheader').on('load', function() {
	// console.log('Image loaded in DOM!');
	// bannerurl = $(this).attr('src');
	// setcolors();
});

$('#tbnbtnsela').click(function(event) {
	tablenews.rows().select();
});

$('#tbnbtndesa').click(function(event) {
	tablenews.rows().deselect();
});

cdatebtn.click(function(event) {
	vadvsearch = false;

	salertloading(isTouchDevice());
	cdatebtn.ladda('start');

	if (clientselid == 0) {
		cliid = cid;
	} else {
		cliid = clientselid;
	}

	fdpstartdate = $('#dpsdate').data('datepicker').getFormattedDate('yyyy-mm-dd');
	fdpenddate = $('#dpedate').data('datepicker').getFormattedDate('yyyy-mm-dd');

	// count_vtype(cliid, fdpstartdate, fdpenddate);
	// count_rating(cliid, fdpstartdate, fdpenddate);
	// count_states(cliid, fdpstartdate, fdpenddate);
	// count_client(cliid, fdpstartdate, fdpenddate);
	// get_subject_keywords(cliid, fdpstartdate, fdpenddate, true, function(keywid){
	// 	add_keyword_news(keywid, cliid, fdpstartdate, fdpenddate, true, 'selecteddate');
	// });

	load_data('datebtn', cliid, fdpstartdate, fdpenddate);

	$('#sublistrow').slideDown('fast');
	cdatebtn.ladda('stop');
});

cadsbtn.click(function(event) {
	vstartdate = $('#adsstartdate').val();
	venddate = $('#adsenddate').val();
	if (vstartdate.length == 0) {
		$('#adsstartdate.tooltipinput').tooltip('show');
		cadsbtn.ladda('stop');
		return;
	} else {
		$('#adsstartdate.tooltipinput').tooltip('hide');
	}
	if (venddate.length == 0) {
		$('#adsenddate.tooltipinput').tooltip('show');
		cadsbtn.ladda('stop');
		return;
	} else {
		$('#adsenddate.tooltipinput').tooltip('hide');
	}

	cadsbtn.ladda('start');

	subkeywordsarr = [];
	tvarr = [], varr = [], earr = [], pcarr = [];
	$('#selpckr_2').html('<option val=""></option>');
	$('#selpckr_3').html('<option val=""></option>');
	$('#selpckr_4').html('<option val=""></option>');
	$('#selpckr_5').html('<option val=""></option>');

	adsstartdate = $('#adsstartdate').data('datepicker').getFormattedDate('yyyy-mm-dd');
	adsenddate = $('#adsenddate').data('datepicker').getFormattedDate('yyyy-mm-dd');
	adsstarttime = $('#adsstarttime').val();
	adsendtime = $('#adsendtime').val();

	$('#dpsdate').datepicker('update', new Date(adsstartdate+'T00:00:00'));
	$('#dpedate').datepicker('update', new Date(adsenddate+'T00:00:00'));

	adsveiculoarr = adsveiculoarr.concat(adsveiculossitesarr);

	adstext = $('#adstext').val();

	adssearchdata = {
		'idempresa': cliid,
		'startdate': adsstartdate,
		'enddate': adsenddate,
		'starttime': adsstarttime,
		'endtime': adsendtime,
		'subjectsid': adssubjectarr.toString(),
		'keywordsid': adskeywordarr.toString(),
		'tveiculosid': adstveiculoarr.toString(),
		'veiculosid': adsveiculoarr.toString(),
		'editoriasid': adseditoriaarr.toString(),
		'estadosid': adsstatesarr.toString(),
		'texto': adstext,
		'destaque': adsdestaque,
		'motivacao': adsmotivacaoarr.toString(),
		'avaliacao': adsavaliacaoarr.toString()
	};

	vadvsearch = true;

	tablenews.clear().draw();
	tablenews.destroy();

	tablenews = $('#tablenews').DataTable({
		'dom': '<"row"<"col-sm-4"l><"col-sm-4"<"#tbntoolbarbtns">><"col-sm-4"f>><"row"<"col-sm-12"rt>><"row"<"col-sm-6"i><"col-sm-6"p>>',
		'destroy': true,
		'autoWidth': false,
		'order': [
			[0, 'desc']
		],
		'columns': [
			{'data': 'datetime', 'searchable': false, 'width': '2%', 'responsivePriority': 0, 'targets': 0},
			{'data': 'TipoVeiculo', 'searchable': true, 'width': '2%', 'responsivePriority': 50, 'targets': 1},
			{'data': 'Veiculo', 'searchable': true, 'width': '5%', 'responsivePriority': 1, 'targets': 2},
			{'data': 'Editoria', 'searchable': true, 'width': '5%', 'responsivePriority': 50, 'targets': 3},
			{'data': 'PalavraChave', 'searchable': true, 'width': '5%', 'responsivePriority': 50, 'targets': 4},
			{'data': 'Titulo', 'searchable': true, 'width': '53%', 'responsivePriority': 2, 'targets': 5},
			{'data': 'Valor', 'searchable': false, 'width': '10%', 'responsivePriority': 50, 'targets': 6},
			{'data': 'Audiencia', 'searchable': false, 'width': '8%', 'responsivePriority': 50, 'targets': 7},
			{'data': 'AvalMotiv', 'searchable': false, 'width': '10%', 'responsivePriority': 50, 'targets': 8}
		],
		'responsive': true,
		'scrollX': false,
		'processing': true,
		'serverSide': true,
		'ajax': {
			'url': '/home/advsearch',
			'type': 'POST',
	    'contentType': 'application/json',
			'data': function(d) {
				d.extra_search = adssearchdata;

				return JSON.stringify(d);
			}
		},
		'initComplete': function(settings) {
			// this.api().columns(1).every(function(coln) {
			// 	var column = this;
			// 	var seltitle = $(column.header()).text();
			// 	var select = $('<select id="selpckr_2" class="filter selectpicker dropup" data-dropupAuto="false" data-windowPadding="1" data-size="6" data-width="fit" data-style="btn-default btn-xs" data-container="body" title="'+seltitle+'"><option val=""></option></select>')
			// 	.appendTo($(column.footer()))
			// 	.on('change', function() {
			// 		var val = $.fn.dataTable.util.escapeRegex($(this).val());
			// 		column.search( val ? '^'+val+'$' : '', true, false).draw();
			// 	});
			// });

			// this.api().columns(2).every(function(coln) {
			// 	var column = this;
			// 	var seltitle = $(column.header()).text();
			// 	var select = $('<select id="selpckr_3" class="filter selectpicker dropup" data-dropupAuto="false" data-windowPadding="1" data-size="6" data-width="fit" data-style="btn-default btn-xs" data-container="body" title="'+seltitle+'"><option val=""></option></select>')
			// 	.appendTo($(column.footer()))
			// 	.on('change', function() {
			// 		var val = $.fn.dataTable.util.escapeRegex($(this).val());
			// 		column.search( val ? '^'+val+'$' : '', true, false).draw();
			// 	});
			// });

			// this.api().columns(3).every(function(coln) {
			// 	var column = this;
			// 	var seltitle = $(column.header()).text();
			// 	var select = $('<select id="selpckr_4" class="filter selectpicker dropup" data-dropupAuto="false" data-windowPadding="1" data-size="6" data-width="fit" data-style="btn-default btn-xs" data-container="body" title="'+seltitle+'"><option val=""></option></select>')
			// 	.appendTo($(column.footer()))
			// 	.on('change', function() {
			// 		var val = $.fn.dataTable.util.escapeRegex($(this).val());
			// 		column.search( val ? '^'+val+'$' : '', true, false).draw();
			// 	});
			// });

			$('.filter.selectpicker').selectpicker('refresh');

			create_table_btns();

			$('#sublistrow').slideUp('fast');
			cadsbtn.ladda('stop');
			$('#advancedsearch').modal('hide');
		},
		'drawCallback': function(settings) {
			this.api().column(1).data().each(function(tvcurrent, i) {
				tvcurrentstr = $(tvcurrent).attr('data-original-title');
				if (tvarr.indexOf(tvcurrentstr) == -1) {
					tvarr.push(tvcurrentstr);
					ihtml = '<option val="'+tvcurrentstr+'">'+tvcurrentstr+'</option>'
					$(ihtml).appendTo('#selpckr_2');
				}
			});

			this.api().column(2).data().each(function (vcurrent, i) {
				vcurrentstr = $(vcurrent).attr('data-original-title');
				if (varr.indexOf(vcurrentstr) == -1) {
					varr.push(vcurrentstr);
					ihtml = '<option val="'+vcurrentstr+'">'+vcurrentstr+'</option>'
					$(ihtml).appendTo('#selpckr_3');
				}
			});

			this.api().column(3).data().each(function (ecurrent, i) {
					ecurrentstr = $(ecurrent).attr('data-original-title');
				if (earr.indexOf(ecurrentstr) == -1) {
					earr.push(ecurrentstr);
					ihtml = '<option val="'+ecurrentstr+'">'+ecurrentstr+'</option>'
					$(ihtml).appendTo('#selpckr_4');
				}
			});

			if(isTouchDevice() === false) {
				$('.tooltipa').tooltip({'container': 'body'});
				$('.tooltipb').tooltip({'container': 'body'});
			}
		},
		'language': {'url': '//cdn.datatables.net/plug-ins/1.10.15/i18n/Portuguese-Brasil.json'},
	});
});

$('input').on('itemAdded', function(event) {
	vsiteid = event.item.Id;
	vsitenm = event.item.Nome;

	adsveiculossitesarr.push(vsiteid);

	$('#adseditoria').selectpicker({title: 'Aguarde...'});
	$('#adseditoria').selectpicker('refresh');
	get_editoriasfromveiculos(vsiteid, function(data) {
		data.map(function(val, index) {
			html =	'<option data-type="adseditoria" data-veiculoid="'+vsiteid+'" data-editoriaid="'+val.Id+'" '+
							'data-subtext="('+vsitenm+')" val="'+val.Id+'">'+val.Nome+'</option>';
			$('#adseditoria').append(html);
		})

		$('#adseditoria').removeAttr('disabled');
		$('#adseditoria').removeClass('disabled');
		$('#adseditoria').selectpicker({title: 'Nada selecionado'});
		$('#adseditoria').selectpicker('refresh');
	});
});

$('input').on('itemRemoved', function(event) {
	vsiteid = event.item.Id;
	vsitenm = event.item.Nome;

	vindex = adsveiculossitesarr.indexOf(vsiteid);
	adsveiculossitesarr.splice(vindex, 1);

	$('#adseditoria').find('[data-veiculoid='+vsiteid+']').remove();
	$('#adseditoria').selectpicker('refresh');
});

$('input').on('ifChecked', function(event) {
	dtype = $(this).attr('data-type');
	dval = $(this).attr('data-val');

	switch (dtype) {
		case 'adsdestaque':
			adsdestaque = dval;
			break;
		case 'adsmotivacao':
			adsmotivacaoarr.push(dval);
			break;
		case 'adsavaliacao':
			adsavaliacaoarr.push(dval);
			break;
		default:
			console.log('option not recognized!');
			break;
	}
	// console.log('destaque:');
	// console.log(adsdestaque);

	// console.log('motivacao:');
	// console.log(adsmotivacaoarr);

	// console.log('avaliacao:');
	// console.log(adsavaliacaoarr);
});

$('input').on('ifUnchecked', function(event) {
	dtype = $(this).attr('data-type');
	dval = $(this).attr('data-val');

	switch (dtype) {
		case 'adsdestaque':
			//do nothing;
			break;
		case 'adsmotivacao':
			aindex = adsmotivacaoarr.indexOf(dval);
			adsmotivacaoarr.splice(aindex, 1);
			break;
		case 'adsavaliacao':
			aindex = adsavaliacaoarr.indexOf(dval);
			adsavaliacaoarr.splice(aindex, 1);
			break;
		default:
			console.log('option not recognized!');
			break;
	}
});

$('.modal').on('show.bs.modal', function(event) {
	$('html').css('overflow-y', 'hidden');
});

$('.modal').on('hide.bs.modal', function(event) {
	$('html').css('overflow-y', 'auto');
});

$('#advancedsearch').on('shown.bs.modal', function(event){
	adssubjectarr = [], adskeywordarr = [], adstveiculoarr = [], adsveiculoarr = [],
	adseditoriaarr = [], adsstatesarr = [], adsveiculossitesarr = [];
});

$('#advancedsearch').on('hidden.bs.modal', function(event){
	$('#adssubject').selectpicker('deselectAll');

	$('#adskeyword').selectpicker('deselectAll');
	$('#adskeyword').children('option').remove();
	$('#adskeyword').selectpicker('refresh');

	$('#adstveiculo').selectpicker('deselectAll');

	// $('#adsveiculosites').slideUp('fast');
	$('#adsveiculosites').tagsinput('removeAll');
	$('#adsveiculosites').val(null);

	$('#adsveiculo').selectpicker('deselectAll');
	$('#adsveiculo').children('option').remove();
	$('#adsveiculo').selectpicker('refresh');

	$('#adseditoria').selectpicker('deselectAll');
	$('#adseditoria').children('option').remove();
	$('#adseditoria').selectpicker('refresh');

	$('#adsstartdate').val(null);
	$('#adsenddate').val(null);

	$('#adsstarttime').val('00:00');
	$('#adsendtime').val('23:59');

	$('#adsstates').selectpicker('deselectAll');
	$('#adsstates').children('option').remove();
	$('#adsstates').selectpicker('refresh');

	$('#adstext').val(null);
	$('.i-checks').iCheck('uncheck');
});

$('#showsinglenews').on('hidden.bs.modal', function(event) {
	$('#mediactni').css('display', 'none');
	$('#modalcsingid').css('display', 'none');
	$('#modalcsinglenewsi').css('display', 'none');
	$('#modalcsinglenewsv').css('display', 'none');
	$('#modaltitlerow').css('display', 'none');
	$('#btnsgroupsnews').css('display', 'none');
	if (isTouchDevice() == false) {
		$('#showsinglenews > .modal-dialog.modal-lg').css('width', '900px');
	}

	$('#mediactni').css('overflow-y', 'hidden');
	$('#modal-texti').slimScroll({
		height: '250px',
		railVisible: true,
		touchScrollStep: 800
	});


	if ($('#btnurl').hasClass('disabled') == false) {
		$('#btnurl').addClass('disabled');
		$('#btnurl').attr('disabled', true);
	}

	$('#mediaimgload').css('display', 'block');
	$('#modalwsinglenews').css('display', 'block');

	if (mediatype == 'video' || mediatype == 'audio') {
		var mmediadel = $('#mediaelvideo');
		if (mmediadel[0].paused) {
			// mmediadel[0].play();
		} else {
			mmediadel[0].pause();
		}
	}
});

$('#myclipping').on('shown.bs.modal', function(event) {
	$(document).off('focusin.modal');
});

$('#myclipping').on('hidden.bs.modal', function(event) {
	$('#mclippwait').css('display', 'block');
	$('#mclipplist').css('display', 'none');
	$('#mclippbtncreate').addClass('disabled');
	$('#mclippbtncreate').attr('disabled', true);
	$('#mclippiname').val(null);
});

$('#tablenews').on(
	'click',
	'tbody > tr > td:nth-child(1),'+
	'tbody > tr > td:nth-child(2),'+
	'tbody > tr > td:nth-child(3),'+
	'tbody > tr > td:nth-child(4),'+
	'tbody > tr > td:nth-child(7)',
	function (event) {
		if (vmyclipp) {
			$(this).parent().toggleClass('selected-mclipp');
			if (trselected.length >= 1) {
				$('#tbnbtnselsave').removeClass('disabled');
				$('#tbnbtnselsave').removeAttr('disabled');
			} else {
				$('#tbnbtnselsave').addClass('disabled');
				$('#tbnbtnselsave').attr('disabled', true);
			}
		} else {
			// var trc = tablenews.row(this).node();
			$(this).parent().toggleClass('selected');
			trselclass = $(this).parent().hasClass('selected');
			trselid = $(this).parent().attr('id').replace('tr_','');
		}

		if (trselclass) {
			trselected.push(trselid);
		} else {
			trselidx = trselected.indexOf(trselid);
			trselected.splice(trselidx, 1);
		}
		console.log(trselected);
	}
);

$('#btneexcel').click(function(event) {
	if (vadvsearch) {
		exportdata = adssearchdata;
	} else {
		select_news();

		startdate = $('#dpsdate').data('datepicker').getFormattedDate('yyyy-mm-dd');
		enddate = $('#dpedate').data('datepicker').getFormattedDate('yyyy-mm-dd');

		exportdata = {
			'startdate': startdate,
			'enddate': enddate,
			'idemp': cliid,
			'idsnot': idsnots,
			'idskw': idskws
		}
	}

	exportdata.vadvsearch = vadvsearch;

	add_data_export(exportdata, function(e){
		tableexport.button(0).trigger();
	});
});

$('#btnepdf').click(function(event) {
	var docDef = {
		content: [
			// if you don't need styles, you can use a simple string to define a paragraph
			'This is a standard paragraph, using default style',

			// using a { text: '...' } object lets you set styling properties
			{ text: 'This paragraph will have a bigger font', fontSize: 15 },

			// if you set pass an array instead of a string, you'll be able
			// to style any fragment individually
			{
				text: [
					'This paragraph is defined as an array of elements to make it possible to ',
					{ text: 'restyle part of it and make it bigger ', fontSize: 15 },
					'than the rest.'
				]
			}
		]
	};

	// pdfMake.createPdf(docDefinition).open();
	pdfMake.createPdf(docDef).download('testName.pdf');
});

$('#btnmyclipp').click(function(event) {
	$('#myclipping').modal('show');

	select_news();
	notsarrc = idsnots.length;
	if (notsarrc == 1) {
		ctext = notsarrc+' notícia selecionada';
	} else {
		ctext = notsarrc+' notícias selecionadas';
	}

	$('#mclippcnews').text(ctext);

	get_mclipp(4240, cliid);
});

$('#mclippiname').keydown(function(event) {
	itext = $(this).val();
	if (itext.length >= 2) {
		$('#mclippbtncreate').removeClass('disabled');
		$('#mclippbtncreate').removeAttr('disabled');
	} else {
		$('#mclippbtncreate').addClass('disabled');
		$('#mclippbtncreate').attr('disabled', true);
	}
});

btncmclipp.click(function(event) {
	btncmclipp.ladda('start');
	if ($(this).hasClass('disabled') == false) {
		selname = $('#mclippiname').val();

		selecoesdata = {
			'iduser': 4240,
			'name': selname,
			'idsnoticias': idsnots,
			'idclient': cliid
		}

		postData('/home/create_mclipp', selecoesdata)
		.then(redata => {
			html =	'<a type="button" class="list-group-item" style="display: none">'+
								selname+
								'<button class="btn btn-xs btn-primary mclippbtnse" style="float: right; type="button" title="Selecionar" data-selid="'+redata.idSelecao+'">'+
									'<i class="fa fa-circle-o-notch fa-spin" style="display: none"></i>'+
									'<i class="fa fa-arrow-right"></i>'+
								'</button>'+
								'<button class="btn btn-xs btn-warning mclippbtned" style="float: right; type="button" title="Editar" data-selid="'+redata.idSelecao+'">'+
									'<i class="fa fa-circle-o-notch fa-spin" style="display: none"></i>'+
									'<i class="fa fa-pencil"></i>'+
								'</button>'+
								'<button class="btn btn-xs btn-danger mclippbtnex" style="float: right; type="button" title="Excluir" data-selid="'+redata.idSelecao+'" data-selnm="'+selname+'">'+
									'<i class="fa fa-circle-o-notch fa-spin" style="display: none"></i>'+
									'<i class="fa fa-trash-o"></i>'+
								'</button>'+
							'</a>';
			$('#mclipplist').prepend(html);

			inserteda = $('#mclipplist').children('a');
			lastrg = 0;
			$(inserteda[lastrg]).fadeIn('fast');

			$('#mclippiname').val(null);
			btncmclipp.ladda('stop');
			$('#mclippbtncreate').addClass('disabled');
			$('#mclippbtncreate').attr('disabled', true);
		})
		.catch(error => console.error(error));
	}
});

$(document).on('click', '.mclippbtnse', function(event) {
	idselecao = $(this).attr('data-selid');
	selname = $(this).parent().text();
	ichilds = $(this).children('i');
	ichilds.last().fadeOut('fast', function() {
		ichilds.first().fadeIn('fast', function() {
			get_mclipp_news(idselecao, cliid);
		});
	});
});

$(document).on('click', '.mclippbtned', function(event) {
	idselecao = $(this).attr('data-selid');
	selname = $(this).parent().text();
	ichilds = $(this).children('i');
	ichilds.last().fadeOut('fast', function() {
		ichilds.first().fadeIn('fast', function() {
			if (vadvsearch) {
				set_tnmc_advsearch(adssearchdata, idselecao, true);
			} else {
				mcedstartdate = $('#dpsdate').data('datepicker').getFormattedDate('yyyy-mm-dd');
				mcedenddate = $('#dpedate').data('datepicker').getFormattedDate('yyyy-mm-dd');
				set_tnmc_date(mcedstartdate, mcedenddate, idselecao, true);
			}
		});
	});
});

$(document).on('click', '.mclippbtnedname', function(event) {
	idsel = $(this).attr('data-selid');
	seloldname = $(this).parent().text();

	swal({
		title: 'Insira o novo nome da seleção "'+seloldname+'":',
		input: 'text',
		showCancelButton: true,
		confirmButtonText: 'Alterar',
		showLoaderOnConfirm: true,
		preConfirm: (selnome) => {
			dataselecao = {
				'idSelecao': idsel,
				'Nome': selnome
			};

			return postData('/home/edit_mclipp', dataselecao)
				.then(redata => {return redata})
				.catch(error => {
					swal.showValidationError(
						`Erro: ${error}`
					)
				});
		},
		allowOutsideClick: false
	}).then((result) => {
		if (result.value) {
			$('#mclippwait').css('display', 'block');
			$('#mclipplist').css('display', 'none');

			get_mclipp(4240, cliid);

			swal({
				title: "Alterado!",
				type: "success",
				allowEscapeKey: false,
				allowOutsideClick: false,
				showCancelButton: false,
				showConfirmButton: true
			});
		}
	})
});

$(document).on('click', '.mclippbtnex', function(event) {
	idsel = $(this).attr('data-selid');
	selname = $(this).parent().text();
});

$(document).on('click', '.audiotext', function(event) {
	var titlec = $(this);
	var titletrid = titlec.parent().parent().attr('id');
	var titlenid = titlec.attr('data-fileid');
	var titlecid = titlec.attr('data-clientid');

	$('#showsinglenews').modal('show');

	dtworker.postMessage({
		'vfunction':'set_call_info',
		'method':'GET',
		'url': '/api/get_call_info/'+titlenid,
		'clientid': titlecid,
		'trid': titletrid,
		'startdate': null,
		'enddate': null,
		'ptype': null
	});
});

$(document).on('click', '.rdaval', function(event){
	dataparid = $(this).parent().attr('id');
	dtnewsid = parseInt($(this).attr('data-newsid'));
	dtselector = '#'+dataparid+' .rdaval';
	$(dtselector).removeClass('active btn-danger btn-warning btn-success');
	$(dtselector).addClass('btn-default');
	$(this).children('i').remove();
	$(this).append('<i class="fa fa-circle-o-notch fa-spin"</i>');

	dataavaliacao = $(this).attr('data-aval');

	switch(dataavaliacao) {
		case '1':
			staval = 1;
			ihtml = '<i class="fa fa-frown-o"></i>';
			removeclass = 'btn-default';
			addclass = 'btn-danger active';
			break;
		case '2':
			staval = 2;
			ihtml = '<i class="fa fa-meh-o"></i>';
			removeclass = 'btn-default';
			addclass = 'btn-warning active';
			break;
		case '3':
			staval = 3;
			ihtml = '<i class="fa fa-smile-o"></i>';
			removeclass = 'btn-default';
			addclass = 'btn-success active';
			break;
		default:
			//do nothing;
			break;
	}

	objsetaval = {
		'aval': staval,
		'idclient': cliid,
		'idnews': dtnewsid
	};

	postData('/home/set_aval', objsetaval)
	.then(
		data => {
			console.log(data);

			$(this).children('i').remove();
			$(this).append(ihtml);
			$(this).removeClass(removeclass);
			$(this).addClass(addclass);
		}
	).catch(
		error => {
			console.error(error);
		}
	);
});

$(document).on('click', '.rdmoti', function(event){
	dataparid = $(this).parent().attr('id');
	dtnewsid = parseInt($(this).attr('data-newsid'));
	dtselector = '#'+dataparid+' .rdmoti';
	$(dtselector).removeClass('active btn-warning btn-success');
	$(dtselector).addClass('btn-default');
	$(this).children('i').remove();
	$(this).append('<i class="fa fa-circle-o-notch fa-spin"</i>');

	datamotivacao = $(this).attr('data-moti');

	switch(datamotivacao) {
		case '1':
			stmoti = 1;
			ihtml = '<i class="fa fa-users"></i>';
			removeclass = 'btn-default';
			addclass = 'btn-success active'
			break;
		case '2':
			stmoti = 2;
			ihtml = '<i class="fa fa-handshake-o">';
			removeclass = 'btn-default';
			addclass = 'btn-warning active';
			break;
		default:
			//do nothing;
			break;
	}

	objsetmoti = {
		'moti': stmoti,
		'idclient': cliid,
		'idnews': dtnewsid
	};

	postData('/home/set_moti', objsetmoti)
	.then(
		data => {
			console.log(data);

			$(this).children('i').remove();
			$(this).append(ihtml);
			$(this).removeClass(removeclass);
			$(this).addClass(addclass);
		}
	).catch(
		error => {
			console.error(error);
		}
	);
});

$('#btnselclo').click(function(event) {
	// $('#modal-texti').scrollTop(0);
	$('#modal-texti').slimScroll({scrollTo: '0px'});
	$('#mediactni').scrollTop(0);

	btnsctrid = $(this).attr('data-trid');
	trselected.push(btnsctrid);

	if ($('#'+btnsctrid).hasClass('selected') == false) {
		$('#'+btnsctrid).addClass('selected');
	}

	$('#showsinglenews').modal('hide');
});

document.getElementById('btnclose').addEventListener('click', function(){
	// document.getElementById('modal-texti').scrollTop = 0;
	$('#modal-texti').slimScroll({ scrollTo: '0px' });
	document.getElementById('mediactni').scrollTop = 0;
});

$(document).on('changed.bs.select', '#sublist select', function(e, clickedIndex, newValue, oldValue) {
	keywid = $(this).find('option').eq(clickedIndex).attr('data-keywordid');
	fopstartdate = $('#dpsdate').data('datepicker').getFormattedDate('yyyy-mm-dd');
	fopenddate = $('#dpedate').data('datepicker').getFormattedDate('yyyy-mm-dd');

	if (newValue) {
		$('.dataTables_processing').show();
		dtworker.postMessage({
			'vfunction':'add_keyword_news_data',
			'method':'GET',
			'url': '/home/keyword_news/'+keywid+'/'+cliid+'/'+fopstartdate+'/'+fopenddate,
			'clientid': cliid,
			'keywordid': keywid,
			'startdate': fopstartdate,
			'enddate': fopenddate,
			'ptype': 'subjectkeyword'
		});
	} else {
		remove_keyword_news(keywid);
	}
});

$('#adssubject').on('changed.bs.select', function(e, clickedIndex, newValue, oldValue) {
	var subjid = parseInt($(this).find('option').eq(clickedIndex).attr('data-subjectid'));
	var subsname = $(this).find('option').eq(clickedIndex).text();

	if (newValue) {
		adssubjectarr.push(subjid);

		$('#adskeyword').selectpicker({title: 'Aguarde...'});
		$('#adskeyword').selectpicker('refresh');
		get_keywordsfromsubject(subjid, function(data) {
			data.map(function(val, index) {
				html =	'<option data-type="adskeyword" data-subjectid="'+val.idAssunto+'" data-keywordid="'+val.Id+'" '+
								'data-subtext="('+subsname+')" val="'+val.Id+'">'+val.Nome+'</option>';
				$('#adskeyword').append(html);
			})

			$('#adskeyword').removeAttr('disabled');
			$('#adskeyword').removeClass('disabled');
			$('#adskeyword').selectpicker({title: 'Nada selecionado'});
			$('#adskeyword').selectpicker('refresh');
		});
	} else {
		sindex = adssubjectarr.indexOf(subjid);
		adssubjectarr.splice(sindex, 1);

		$('#adskeyword').find('[data-subjectid='+subjid+']').remove();
		$('#adskeyword').selectpicker('refresh');
	}

	// console.log('Assunto:');
	// console.log(adssubjectarr);
});

$('#adskeyword').on('changed.bs.select', function(e, clickedIndex, newValue, oldValue) {
	var keywid = parseInt($(this).find('option').eq(clickedIndex).attr('data-keywordid'));
	var keywname = $(this).find('option').eq(clickedIndex).text();

	if (newValue) {
		adskeywordarr.push(keywid);
	} else {
		kindex = adskeywordarr.indexOf(keywid);
		adskeywordarr.splice(kindex, 1);
	}

	// console.log('Palavra-chave:');
	// console.log(adskeywordarr);
});

$('#adstveiculo').on('changed.bs.select', function(e, clickedIndex, newValue, oldValue) {
	var tveid = parseInt($(this).find('option').eq(clickedIndex).attr('data-tveiculoid'));
	var tvesname = $(this).find('option').eq(clickedIndex).text();

	if (newValue) {
		adstveiculoarr.push(tveid);
		if (tveid == 4) {
			$('#adstveiculo').selectpicker('toggle');
			$('#adsveiculositesfg').slideDown('fast');
		} else {
			adsvslt = $('#adsveiculosites').val();
			if (adsvslt.length > 0) {
			} else {
				$('#adsveiculositesfg').slideUp('fast');
			}

			$('#adsveiculo').selectpicker({title: 'Aguarde...'});
			$('#adsveiculo').selectpicker('refresh');
			get_veiculosfromtipoveiculos(tveid, function(data) {
				data.map(function(val, index) {
					html =	'<option data-type="adsveiculo" data-tveiculoid="'+val.idTipoVeiculo+'" data-veiculoid="'+val.Id+'" '+
									'data-subtext="('+tvesname+')" val="'+val.Id+'">'+val.Nome+'</option>';
					$('#adsveiculo').append(html);
				})

				$('#adsveiculo').removeAttr('disabled');
				$('#adsveiculo').removeClass('disabled');
				$('#adsveiculo').selectpicker({title: 'Nada selecionado'});
				$('#adsveiculo').selectpicker('refresh');
			});
		}
	} else {
		tvindex = adstveiculoarr.indexOf(tveid);
		adstveiculoarr.splice(tvindex, 1);

		$('#adsveiculo').find('[data-tveiculoid='+tveid+']').remove();
		$('#adsveiculo').selectpicker('refresh');
	}

	// console.log('Tipo de Veiculo:');
	// console.log(adstveiculoarr);
});

$('#adsveiculo').on('changed.bs.select', function(e, clickedIndex, newValue, oldValue) {
	var veid = parseInt($(this).find('option').eq(clickedIndex).attr('data-veiculoid'));
	var vesname = $(this).find('option').eq(clickedIndex).text();

	if (newValue) {
		adsveiculoarr.push(veid);

		$('#adseditoria').selectpicker({title: 'Aguarde...'});
		$('#adseditoria').selectpicker('refresh');
		get_editoriasfromveiculos(veid, function(data) {
			data.map(function(val, index) {
				html =	'<option data-type="adseditoria" data-veiculoid="'+val.idVeiculo+'" data-editoriaid="'+val.Id+'" '+
								'data-subtext="('+vesname+')" val="'+val.Id+'">'+val.Nome+'</option>';
				$('#adseditoria').append(html);
			})

			$('#adseditoria').removeAttr('disabled');
			$('#adseditoria').removeClass('disabled');
			$('#adseditoria').selectpicker({title: 'Nada selecionado'});
			$('#adseditoria').selectpicker('refresh');
		});
	} else {
		vindex = adsveiculoarr.indexOf(veid);
		adsveiculoarr.splice(vindex, 1);

		$('#adseditoria').find('[data-veiculoid='+veid+']').remove();
		$('#adseditoria').selectpicker('refresh');
	}

	// console.log('Veiculo:');
	// console.log(adsveiculoarr);
});

$('#adseditoria').on('changed.bs.select', function(e, clickedIndex, newValue, oldValue) {
	var edid = parseInt($(this).find('option').eq(clickedIndex).attr('data-editoriaid'));
	var vedsname = $(this).find('option').eq(clickedIndex).text();

	if (newValue) {
		adseditoriaarr.push(edid);
	} else {
		eindex = adseditoriaarr.indexOf(edid);
		adseditoriaarr.splice(eindex, 1);
	}

	// console.log('Editoria:');
	// console.log(adseditoriaarr);
});

$('#adsstates').on('changed.bs.select', function(e, clickedIndex, newValue, oldValue) {
	var stateid = parseInt($(this).find('option').eq(clickedIndex).attr('data-stateid'));
	var statename = $(this).find('option').eq(clickedIndex).text();

	if (newValue) {
		adsstatesarr.push(stateid);
	} else {
		sindex = adsstatesarr.indexOf(stateid);
		adsstatesarr.splice(sindex, 1);
	}

	// console.log('States:');
	// console.log(adsstatesarr);
});

$('#btnasearch').click(function(event) {
	$('#advancedsearch').modal('show');
});

$('.cdrefreshitem').click(function(event) {
	refreshtm = $(this).attr('data-refreshtm');

	clearInterval(rfdata);
	refresh_countdown(refreshtm);
});

$('#btnexpand').click(function(event) {
	$('#mediactni').animate({'height': '100%'}, 'fast');
	$('#showsinglenews > .modal-dialog.modal-lg').animate({'width': '98%'}, 'fast');
	$('#modal-texti').slimScroll({'height': 'auto'});
});

$('#btndown').click(function(event) {
	downtype = $(this).attr('data-downtype');

	$(this).removeClass('disabled');
	$(this).removeAttr('disabled');

	switch (downtype) {
		case 'video':
			// statements_1
			break;
		case 'audio':
			// statements_1
			break;
		case 'image':
			// statements_1
			break;
		case 'noimage':
			$(this).addClass('disabled');
			$(this).attr('disabled', true);
			break;
		case 'facsimile':
			canvas = document.createElement('canvas');
			ctx = canvas.getContext('2d');

			imgw = imgobj.width;
			imgh = imgobj.height;
			ctx.canvas.width = imgw;
			ctx.canvas.height = imgh;

			ctx.drawImage(imgobj, 0, 0);
			ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
			ctx.fillRect(0, 0, imgw, imgh);
			ctx.drawImage(imgobj, snewsx1, snewsy1, snewsmw, snewsmh, snewsx1, snewsy1, snewsmw, snewsmh);

			document.getElementById('divmediacanvas').innerHTML = '';
			canvas.setAttribute('id', 'mediacanvas');
			document.getElementById('divmediacanvas').appendChild(canvas);

			canvasel = document.getElementById('mediacanvas');
			canvasdataURL = canvasel.toDataURL('image/png');
			// cvdowndataURL = canvasel.toDataURL('image/png').replace('image/png', 'image/octet-stream');

			windowo = window.open();
			windowo.document.write(
				'<head><title>Impresso</title><head>'+
				'<body>'+
				'<img src="'+canvasdataURL+'" style="width: 30%"/>'+
				'<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>'+
				'<script type="text/javascript" charset="utf-8">'+
				'$(document).ready(function() {\n'+
				'	setTimeout(function() {\n'+
				'		$("img").animate({"width": "100%"}, 500);'+
				'		$("img").addClass("expanded");\n'+
				'		$("img").css("cursor", "zoom-out");\n'+
				'	}, 10);\n'+
				'	$("img").click(function(event) {\n'+
				'		if ($(this).hasClass("expanded")) {\n'+
				'			$(this).removeClass("expanded");\n'+
				'			$(this).animate({"width": "30%"}, "fast");\n'+
				'			$("img").css("cursor", "zoom-in");\n'+
				'		} else {\n'+
				'			$(this).addClass("expanded");\n'+
				'			$(this).animate({"width": "100%"}, "fast");\n'+
				'			$("img").css("cursor", "zoom-out");\n'+
				'		}\n'+
				'	});\n'+
				'});\n'+
				'</script>'+
				'</body>'
			);
			windowo.document.close();
			break;
	}
});

$(document).on('click', '#tbnbtnsela', function(event) {
	tablenews.rows().select();

	tablenews.rows().every(function(rowIdx, tableLoop, rowLoop) {
		rownode = this.node();
		trselid = $(rownode).attr('id').replace('tr_','');

		if (trselected.indexOf(trselid) === -1) {
			trselected.push(trselid);
		}
	});

	console.log(trselected);
});

$(document).on('click','#tbnbtndesa', function(event) {
	tablenews.rows().deselect();

	trselected = [];

	console.log(trselected);
});

$('#side-menu li').click(function(event) {
	idcld = $(this).attr('id');
	gpage = $(this).attr('data-page');
	theader = $(this).children('a').children('span').text();
	dheader = $(this).attr('data-desc');

	if (idcld == 'lihome') {
		$('#divmenu').slideUp('fast', function() {
			$('#divheader').slideUp('fast');
			$('#divhome').slideDown('fast', function() {
				$('#divhome').removeClass('ishidden');
				$('ul.nav li').removeClass('active');
				$('#lihome').addClass('active');
			});
		})
	} else {
		$.get('/home/'+gpage, function(data) {
			$('#divtheader').text(theader);
			$('#divdheader').text(dheader);
			$('#divcbheader').text(theader);

			$('#divmenu').html(data);

			setTimeout(function() {
				$.get('/api/'+gpage, function(redata) {
					switch (gpage) {
						case 'categories':
							table_add_category(redata);
							break;
						case 'keywords':
							table_add_keyword(redata);
							break;
						default:
							alert('Not recog!')
							break;
					}
				});
			}, 200);

			currtable = $('#table'+gpage).DataTable({
				'destroy': true,
				'autoWidth': false,
				'order': [
					[0, 'asc']
				],
				'processing': true,
				'rowId': 'Id',
				'language': {'url': '//cdn.datatables.net/plug-ins/1.10.15/i18n/Portuguese-Brasil.json'}
			});

			$('ul.nav li').removeClass('active');
			$('#'+idcld).addClass('active');

			if ($('#divhome').hasClass('ishidden') == false) {
				$('#divhome').slideUp('fast', function() {
					$('#divhome').addClass('ishidden');
					$('#divheader').slideDown('fast');
					$('#divmenu').slideDown('fast', function() {
					});
				});
			}
		});
	}
});

$(document).on('click', '#maddcatbtnadd', function(event) {
	maddcataddbtn = $('#maddcatbtnadd').ladda();
	maddcataddbtn.ladda('start');
	nameinput = $('#maddcatinpname').val();
	maddedit = $(this).attr('data-edit');
	$('#maddcatinpname').attr('disabled', true);
	$('#maddcatinpname').addClass('disabled');
	if (nameinput.length == 0) {
		$('#maddcatinpnameerr').text('O nome não pode ficar em branco!');
		$('#maddcatinpnameerr').fadeIn('fast');
		$('#maddcatinpname').addClass('error');
		$('#maddcatinpname').focus();
		$('#maddcatinpname').select();
		$('#maddcatinpname').removeAttr('disabled');
		$('#maddcatinpname').removeClass('disabled');
		maddcataddbtn.ladda('stop');
	} else if (nameinput.length >= 3) {
		if (maddedit == 'false') {
			postdata = {'name': nameinput};
			posturl = '/api/add_category';
			postData(posturl, postdata)
			.then(resp => {
				$('#maddcatinpnameerr').fadeOut('fast');
				$('#maddcatinpname').removeClass('error');
				$('#maddcatinpname').removeAttr('disabled');
				$('#maddcatinpname').removeClass('disabled');
				$('#maddcatinpname').val(null);
				justadded = [{'id':resp.id_added, 'name': nameinput}];
				table_add_category(justadded);
				maddcataddbtn.ladda('stop');
			});
		} else {
			catid = $(this).attr('data-catid');
			epostdata = {'id': catid, 'name': nameinput};
			eposturl = '/api/edit_category';
			postData(eposturl, epostdata)
			.then(resp => {
				$('#maddcatinpnameerr').fadeOut('fast');
				$('#maddcatinpname').removeClass('error');
				$('#maddcatinpname').removeAttr('disabled');
				$('#maddcatinpname').removeClass('disabled');
				$('#maddcatinpname').val(null);
				table_edit_category('#tdname'+catid, nameinput);
				maddcataddbtn.ladda('stop');
				$('#modaladdcat').modal('hide');
			}).
			catch(err => {
				console.log(err);
				alert('Error!');
				$('#maddcatinpnameerr').fadeOut('fast');
				$('#maddcatinpname').removeClass('error');
				$('#maddcatinpname').removeAttr('disabled');
				$('#maddcatinpname').removeClass('disabled');
				maddcataddbtn.ladda('stop');
			});
		}
	} else {
		$('#maddcatinpnameerr').text('O nome não pode ser muito curto!');
		$('#maddcatinpnameerr').fadeIn('fast');
		$('#maddcatinpname').addClass('error');
		$('#maddcatinpname').focus();
		$('#maddcatinpname').select();
		$('#maddcatinpname').removeAttr('disabled');
		$('#maddcatinpname').removeClass('disabled');
		maddcataddbtn.ladda('stop');
	}
});

$(document).on('click', '.meditcatbtn', function() {
	catid = $(this).attr('data-catid');
	tx = $(this).parent('td').parent('tr').children('td');
	tdtext = $(tx[1]).text();
	$('#maddcatinpname').val(tdtext);
	$('#maddtitle').text('Editar');
	$('#maddcatbtnadd').attr('data-catid', catid);
	$('#maddcatbtnadd').attr('data-edit', 'true');
	$('#maddcatbtnadd').text('Salvar');
});

$(document).on('click', '.mdelcatbtn', function() {
	catid = $(this).attr('data-catid');
	trid = '#trcat'+catid;
	swal({
		title: 'Tem certeza que deseja remover?',
		type: 'warning',
		confirmButtonColor: '#3085d6',
		confirmButtonText: 'Sim',
		showCancelButton: true,
		cancelButtonColor: '#d33',
		cancelButtonText: 'Não'
	}).then((result) => {
		if (result.value) {
			postdel = {'id': catid};
			postData('/api/remove_category', postdel)
			.then(resp => {
				table_remove_category(trid);
			});
		}
	})
});

$(document).on('click', '.mencatbtn', function() {
	idcat = $(this).attr('data-catid');
	nacat = $('#tdname'+idcat).text();
	if ($(this).hasClass('active')) {
		postData('/api/edit_category', {'id': idcat, 'name': nacat,'enable': 0})
		.then(res => {
			console.log(res);
			$(this).removeClass('active');
		});
	} else {
		postData('/api/edit_category', {'id': idcat, 'name': nacat,'enable': 1})
		.then(res => {
			console.log(res);
			$(this).addClass('active');
		});
	}
});

$(document).on('shown.bs.modal', '#modaladdcat', function(event) {
	$('#maddcatinpname').focus();
});

$(document).on('hiden.bs.modal', '#modaladdcat', function(event) {
	$('#maddtitle').text('Adicionar');
	$('#maddcatbtnadd').text('Adicionar');
	$('#maddcatinpname').val(null);
	$('#maddcatbtnadd').attr('data-edit', 'false');
	$('#maddcatbtnadd').removeAttr('data-catid');
});
///////////////

$(document).on('click', '#maddkeybtnadd', function(event) {
	maddcataddbtn = $('#maddcatbtnadd').ladda();
	maddcataddbtn.ladda('start');
	nameinput = $('#maddkeyinpname').val();
	priosel = $('#maddkeyinpprio option:selected').val();
	idcatsel = $('#maddkeyinpcat option:selected').attr('val');
	nmcatsel = $('#maddkeyinpcat option:selected').val();
	searchttxt = $('#maddkeyinpsearcht').val();
	maddedit = $(this).attr('data-edit');
	$('#maddkeyinpname').attr('disabled', true);
	$('#maddkeyinpname').addClass('disabled');
	if (nameinput.length == 0) {
		$('#maddkeyinpnameerr').text('O nome não pode ficar em branco!');
		$('#maddkeyinpnameerr').fadeIn('fast');
		$('#maddcatinpname').addClass('error');
		$('#maddcatinpname').focus();
		$('#maddcatinpname').select();
		$('#maddcatinpname').removeAttr('disabled');
		$('#maddcatinpname').removeClass('disabled');
		maddcataddbtn.ladda('stop');
	} else if (nameinput.length >= 3) {
		if (maddedit == 'false') {
			postdata = {'name': nameinput, 'priority': priosel, 'idcategory': idcatsel, 'searchterm': searchttxt};
			posturl = '/api/add_keyword';
			postData(posturl, postdata)
			.then(resp => {
				$('#maddkeyinpnameerr').fadeOut('fast');
				$('#maddkeyinpname').removeClass('error');
				$('#maddkeyinpname').removeAttr('disabled');
				$('#maddkeyinpname').removeClass('disabled');
				$('#maddkeyinpname').val(null);
				$('#maddkeyinpsearcht').val(null);
				justadded = [{'id': resp.id_added, 'name': nameinput, 'priority': priosel, 'category': nmcatsel, 'searchterm': searchttxt}];
				console.log(justadded);
				table_add_keyword(justadded);
				maddcataddbtn.ladda('stop');
			});
		} else {
			keyid = $(this).attr('data-keyid');
			epostdata = {'id': keyid, 'name': nameinput, 'priority': priosel, 'idcategory': idcatsel, 'searchterm': searchttxt};
			console.log(epostdata);
			eposturl = '/api/edit_category';
			postData(eposturl, epostdata)
			.then(resp => {
				$('#maddkeyinpnameerr').fadeOut('fast');
				$('#maddkeyinpname').removeClass('error');
				$('#maddkeyinpname').removeAttr('disabled');
				$('#maddkeyinpname').removeClass('disabled');
				$('#maddkeyinpname').val(null);
				$('#maddkeyinpsearcht').val(null);
				table_edit_keyword('#tdname'+catid, nameinput);
				maddcataddbtn.ladda('stop');
				$('#modaladdcat').modal('hide');
			}).
			catch(err => {
				console.log(err);
				alert('Error!');
				$('#maddkeyinpnameerr').fadeOut('fast');
				$('#maddkeyinpname').removeClass('error');
				$('#maddkeyinpname').removeAttr('disabled');
				$('#maddkeyinpname').removeClass('disabled');
				maddcataddbtn.ladda('stop');
			});
		}
	} else {
		$('#maddkeyinpnameerr').text('O nome não pode ser muito curto!');
		$('#maddkeyinpnameerr').fadeIn('fast');
		$('#maddkeyinpname').addClass('error');
		$('#maddkeyinpname').focus();
		$('#maddkeyinpname').select();
		$('#maddkeyinpname').removeAttr('disabled');
		$('#maddkeyinpname').removeClass('disabled');
		maddcataddbtn.ladda('stop');
	}
});

$(document).on('click', '.meditkeybtn', function() {
	catid = $(this).attr('data-catid');
	prio = $(this).attr('data-prio');
	searcht = $(this).attr('data-searchterm');
	tx = $(this).parent('td').parent('tr').children('td');
	tdtext = $(tx[1]).text();
	$('#maddkeyinpname').val(tdtext);
	$('#maddkeyinpprio option[val="'+prio+'"').attr('selected', true);
	$('#maddkeyinpcat option[val="'+catid+'"').attr('selected', true);
	$('#maddkeyinpsearcht').val(searcht);
	$('#maddtitle').text('Editar');
	$('#maddkeybtnadd').attr('data-catid', catid);
	$('#maddkeybtnadd').attr('data-edit', 'true');
	$('#maddkeybtnadd').text('Salvar');
});

$(document).on('click', '.mdelkeybtn', function() {
	catid = $(this).attr('data-catid');
	trid = '#trcat'+catid;
	swal({
		title: 'Tem certeza que deseja remover?',
		type: 'warning',
		confirmButtonColor: '#3085d6',
		confirmButtonText: 'Sim',
		showCancelButton: true,
		cancelButtonColor: '#d33',
		cancelButtonText: 'Não'
	}).then((result) => {
		if (result.value) {
			postdel = {'id': catid};
			postData('/api/remove_category', postdel)
			.then(resp => {
				table_remove_category(trid);
			});
		}
	})
});

$(document).on('click', '.menkeybtn', function() {
	if ($(this).hasClass('active')) {
		$(this).removeClass('active');
	} else {
		$(this).addClass('active');
	}
});

$(document).on('shown.bs.modal', '#modaladdkey', function(event) {
	$('#maddkeyinpname').focus();
});

$(document).on('hiden.bs.modal', '#modaladdkey', function(event) {
	$('#maddtitle').text('Adicionar');
	$('#maddcatbtnadd').text('Adicionar');
	$('#maddcatinpname').val(null);
	$('#maddcatbtnadd').attr('data-edit', 'false');
	$('#maddcatbtnadd').removeAttr('data-catid');
});


//worker merssages
dtworker.onmessage = function(event) {
	jresponse = JSON.parse(event.data.response);
	if (typeof event.data.clientid !== 'undefined') {
		wcliendid = event.data.clientid;
	} else {
		wcliendid = 0;
	}
	if (typeof event.data.trid !== 'undefined') {
		wtrid = event.data.trid;
	} else {
		wtrid = null;
	}
	wstartdate = event.data.startdate;
	wenddate = event.data.enddate;
	wptype = event.data.ptype;
	if (typeof event.data.keywordid !== 'undefined') {
		wkeywordid = event.data.keywordid;
	} else {
		wkeywordid = 0;
	}

	vfunc = event.data.vfunction;
	switch (vfunc) {
		case 'get_calls':
			add_calls(jresponse, wcliendid, wstartdate, wenddate, true, wptype);
			break;
		case 'set_call_info':
			set_call_info(jresponse.response.docs[0], wtrid);
			break;
		case 'get_client_info':
			set_client_info(wcliendid, jresponse.name, jresponse.banner, true);
			break;
		case 'count_vtype':
			set_count_vtype(jresponse);
			break;
		case 'count_planos':
			set_count_planos(jresponse);
			break;
		case 'count_sent':
			set_count_sent(jresponse);
			break;
		case 'count_states':
			set_count_states(jresponse);
			break;
		case 'count_rating':
			set_count_rating(jresponse);
			break;
		case 'count_client':
			set_count_client(jresponse);
			break;
		case 'get_subject_keywords':
			$('#dpsdate').datepicker('update', new Date(wstartdate+'T00:00:00'));
			$('#dpedate').datepicker('update', new Date(wenddate+'T00:00:00'));
			add_keyword_news(set_subject_keywords(jresponse, true), wcliendid, wstartdate, wenddate, true, wptype);
			break;
		case 'get_subjects':
			set_subjects(jresponse);
			break;
		case 'add_keyword_news_data':
			add_keyword_news_data(jresponse, wkeywordid, wcliendid, false, wptype);
			break;
		case 'set_single_news_dtw':
			set_single_news_dtw(jresponse, wtrid);
			break;
		default:
			console.log('Function not recog!');
			break;
	}
}

//read along
$(document).on('click', 'span[data-dur]', function(){
	ptextid = 'modal-textv';
	pmediaid = 'mediaelvideo';
	spantime = $(this).attr('data-begin');

	startread(pmediaid, ptextid, spantime, true);
	// $('#'+pmediaid)[0].play();
});