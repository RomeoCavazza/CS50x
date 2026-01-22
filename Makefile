# Makefile CS50 - pour que #include <cs50.h> fonctionne
# Compile depuis la racine : make mario/mario, make me/hello, etc.

CC = cc
CFLAGS = -Wall -Wextra -std=c11 -I$(HOME)/.local/include
LDFLAGS = -L$(HOME)/.local/lib -lcs50 -lm -Wl,-rpath,$(HOME)/.local/lib
CHECK50 = $(CURDIR)/.venv/bin/check50
SUBMIT50 = $(CURDIR)/.venv/bin/submit50

# Compile n'importe quel .c : make dossier/programme
%: %.c
	$(CC) $(CFLAGS) "$<" -o "$@" $(LDFLAGS)

# check50 : make mario-less/check, make me/check, etc.
%/check:
	cd $* && $(CHECK50) cs50/problems/2026/x/$*

# submit50 : make mario-less/submit, make me/submit, etc.
%/submit:
	cd $* && $(SUBMIT50) cs50/problems/2026/x/$*

clean:
	find . -maxdepth 2 -type f -executable ! -name ".*" -delete

