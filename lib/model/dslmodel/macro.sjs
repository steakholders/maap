macro collection {
	case {
		$collection_keyword ( $($key:ident : $val:expr) (,) ... ) { $body ... }
	} => {
		var _collection = makeIdent("_collection", #{$collection_keyword});
		letstx $_collection = [_collection];
		var collectionModel = makeIdent("collectionModel", #{$collection_keyword});
		letstx $collectionModel = [collectionModel];
		
		return #{ {
			var $_collection = new DslCollectionModel(domain, {
				$($key: $val) (,) ...
			});
			registerCollection($_collection);
			$body ...
		} };
	}
}

macro index {
	case {
		$index_keyword { $body ... }
	} => {
		return #{ {
			$index_keyword () { $body ... }
		} };
	}

	case {
		$index_keyword( $($key:ident : $val:expr) (,) ... ) { $body ... }
	} => {
		var _collection = makeIdent("_collection", #{$index_keyword});
		letstx $_collection = [_collection];
		var indexModel = makeIdent("indexModel", #{$index_keyword});
		letstx $indexModel = [indexModel];

		return #{ {
			var _index = new IndexModel($_collection, {
				$($key: $val) (,) ...
			});
			$_collection.setIndexModel(_index);
			$body ...
		} };
	}
}

macro show {
	case {
		$show_keyword { $body ... }
	} => {
		return #{ {
			$show_keyword () { $body ... }
		} };
	}

	case {
		$show_keyword( $($key:ident : $val:expr) (,) ... ) { $body ... }
	} => {
		var _collection = makeIdent("_collection", #{$show_keyword});
		letstx $_collection = [_collection];
		var showModel = makeIdent("showModel", #{$show_keyword});
		letstx $showModel = [showModel];
		
		return #{ {
			var _show = new ShowModel($_collection, {
				$($key: $val) (,) ...
			});
			$_collection.setShowModel(_show);
			$body ...
		} };
	}
}

macro column {
	case {
		$column_keyword ( $($key:ident : $val:expr) (,) ... )
	} => {
		var _index = makeIdent("_index", #{$column_keyword});
		letstx $_index = [_index];
		
		return #{
			var _column = new Column($_index, {
				$($key: $val) (,) ...
			});
			$_index.addColumn(_column);
		};
	}
}

macro row {
	case {
		$row_keyword ( $($key:ident : $val:expr) (,) ... )
	} => {
		var _show = makeIdent("_show", #{$row_keyword});
		letstx $_show = [_show];
		
		return #{
			var _row = new Row($_show, {
				$($key: $val) (,) ...
			});
			$_show.addRow(_row);
		};
	}
}

export collection;
export index;
export show;
export column;
export row;
